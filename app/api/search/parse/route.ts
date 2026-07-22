import { NextRequest, NextResponse } from "next/server";
import { CITIES, specialties } from "@/data/patient";

export const dynamic = "force-dynamic";

// Server-only — reads the secret key from env, must never reach the browser bundle.
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";
const MODEL = "claude-haiku-4-5-20251001";

// Optional — our own Hinglish-tuned symptom router (see the 1HMS-NLP-Router repo), tried
// BEFORE the Anthropic call below since it's free and has no external-API round trip. Only
// its confident answers are used; anything it defers on (or any failure calling it at all)
// falls through to the existing Anthropic path unchanged — this is a pure fast-path addition,
// not a replacement, so leaving this unset just means every query goes to Anthropic exactly
// as it did before this existed.
const NLP_ROUTER_BASE_URL = process.env.NLP_ROUTER_BASE_URL ?? "";

interface NlpRouterResult {
  specialtyIds: string[];
  usedDefault: boolean;
}

async function callNlpRouter(query: string): Promise<NlpRouterResult | null> {
  if (!NLP_ROUTER_BASE_URL) return null;
  try {
    const res = await fetch(`${NLP_ROUTER_BASE_URL}/route-symptom`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      specialtyIds: Array.isArray(data?.specialtyIds) ? data.specialtyIds : [],
      usedDefault: Boolean(data?.usedDefault),
    };
  } catch (err) {
    console.error("NLP router call failed, falling back to Anthropic:", err);
    return null;
  }
}

// Matches Claude's own "near me" handling below, done locally since the NLP router (unlike
// Claude) doesn't do location parsing — this runs only for the NLP fast-path; the Anthropic
// path below still extracts city itself, unchanged.
const NEAR_ME_PATTERN = /\b(near me|nearby|close to me|paas mein|aas paas)\b/i;

function extractCityFromQuery(query: string): string | null {
  if (NEAR_ME_PATTERN.test(query)) return "NEAR_ME";
  const q = query.toLowerCase();
  const uniqueNames = Array.from(new Set(CITIES.map((c) => c.name)));
  for (const name of uniqueNames) {
    if (q.includes(name.toLowerCase())) return name;
  }
  return null;
}

const TOOL_NAME = "extract_search_intent";

// Built from the same specialty taxonomy the rest of the app already uses (see
// DoctorDirectory.tsx's specialty chips) — the blurbs already describe symptoms in plain
// language ("Heart, BP & chest concerns"), which is exactly what lets the model map free
// text to the right specialty without a hand-maintained synonym dictionary.
function buildSystemPrompt(): string {
  const taxonomy = specialties
    .map((s) => `- ${s.id}: ${s.name} — ${s.blurb}`)
    .join("\n");
  return (
    "You interpret a patient's free-text or voice-transcribed search on a doctor-booking " +
    "website. Map it to the closest medical specialty from this fixed list (use the id " +
    "exactly as given, or null if nothing reasonably matches):\n" +
    taxonomy +
    "\n\nAlso extract any location mentioned. If the query implies the patient's current " +
    'location ("near me", "nearby", "close to me") without naming a place, return the ' +
    'literal string "NEAR_ME" for city instead of guessing a place name. If no location is ' +
    "implied at all, return null for city.\n\n" +
    "Always call the extract_search_intent tool with your answer — never reply in plain text."
  );
}

function buildToolSchema() {
  const specialtyIds = specialties.map((s) => s.id);
  return {
    name: TOOL_NAME,
    description: "Structured interpretation of a doctor-search query.",
    input_schema: {
      type: "object",
      properties: {
        specialtyId: {
          type: ["string", "null"],
          enum: [...specialtyIds, null],
          description: "Best matching specialty id from the fixed taxonomy, or null.",
        },
        city: {
          type: ["string", "null"],
          description: 'Location mentioned in the query, "NEAR_ME", or null.',
        },
        keywords: {
          type: "array",
          items: { type: "string" },
          description: "Key symptom/condition words from the query, for text-search fallback.",
        },
      },
      required: ["specialtyId", "city", "keywords"],
    },
  };
}

export interface SearchIntent {
  specialtyId: string | null;
  city: string | null;
  keywords: string[];
}

// POST /api/search/parse — { query: string } -> SearchIntent | { notConfigured: true }
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const query = typeof body?.query === "string" ? body.query.trim() : "";
  if (!query) {
    return NextResponse.json({ error: "query is required" }, { status: 400 });
  }

  const nlpResult = await callNlpRouter(query);
  if (nlpResult && !nlpResult.usedDefault && nlpResult.specialtyIds.length > 0) {
    return NextResponse.json({
      specialtyId: nlpResult.specialtyIds[0],
      city: extractCityFromQuery(query),
      keywords: query.split(/\s+/).filter((w) => w.length >= 3),
    });
  }

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ notConfigured: true });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 300,
        system: buildSystemPrompt(),
        messages: [{ role: "user", content: query }],
        tools: [buildToolSchema()],
        tool_choice: { type: "tool", name: TOOL_NAME },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic search-parse request failed:", res.status, errText);
      return NextResponse.json({ error: "AI interpretation failed" }, { status: 502 });
    }

    const data = await res.json();
    const toolUse = (data?.content ?? []).find((block: any) => block?.type === "tool_use" && block?.name === TOOL_NAME);
    if (!toolUse?.input) {
      return NextResponse.json({ error: "AI returned no structured result" }, { status: 502 });
    }

    const intent: SearchIntent = {
      specialtyId: toolUse.input.specialtyId ?? null,
      city: toolUse.input.city ?? null,
      keywords: Array.isArray(toolUse.input.keywords) ? toolUse.input.keywords : [],
    };
    return NextResponse.json(intent);
  } catch (err) {
    console.error("Anthropic search-parse threw:", err);
    return NextResponse.json({ error: "AI interpretation failed" }, { status: 502 });
  }
}
