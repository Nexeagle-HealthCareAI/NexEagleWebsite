import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Minimal append-only JSON persistence so bookings and feedback are never lost
 * before 1HMS (or a real database) is wired up. Not intended for production
 * scale — replace with a proper datastore later.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../../data");
const storeFile = path.join(dataDir, "store.json");

type StoreShape = {
  appointments: unknown[];
  feedback: unknown[];
};

async function readStore(): Promise<StoreShape> {
  try {
    const raw = await fs.readFile(storeFile, "utf8");
    const parsed = JSON.parse(raw);
    return {
      appointments: Array.isArray(parsed.appointments) ? parsed.appointments : [],
      feedback: Array.isArray(parsed.feedback) ? parsed.feedback : [],
    };
  } catch {
    return { appointments: [], feedback: [] };
  }
}

async function writeStore(store: StoreShape): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(storeFile, JSON.stringify(store, null, 2), "utf8");
}

export async function saveAppointment(record: unknown): Promise<void> {
  const store = await readStore();
  store.appointments.push(record);
  await writeStore(store);
}

export async function saveFeedback(record: unknown): Promise<void> {
  const store = await readStore();
  store.feedback.push(record);
  await writeStore(store);
}
