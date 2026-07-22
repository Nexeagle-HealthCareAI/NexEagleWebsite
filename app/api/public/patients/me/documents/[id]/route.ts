import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { easyhmsFetch } from "@/lib/api/server";
import { PATIENT_SESSION_COOKIE } from "@/lib/api/patientSession";

export const dynamic = "force-dynamic";

// DELETE /api/public/patients/me/documents/[id]  →  proxies DELETE {EASYHMS}/public/patients/me/documents/{id}
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const token = cookies().get(PATIENT_SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "Please log in again." }, { status: 401 });
  }

  const r = await easyhmsFetch(`/public/patients/me/documents/${encodeURIComponent(params.id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (r.notConfigured) {
    return NextResponse.json({ notConfigured: true });
  }
  return NextResponse.json(r.data, { status: r.status });
}
