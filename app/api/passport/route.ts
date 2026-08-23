import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { passportStates } from "../../../db/schema";

function safeArray(value: unknown, max: number) {
  return Array.isArray(value) ? value.slice(0, max) : [];
}

export async function GET(request: Request) {
  const clientId = new URL(request.url).searchParams.get("clientId")?.slice(0, 100);
  if (!clientId) return Response.json({ error: "clientId required" }, { status: 400 });
  const rows = await getDb().select().from(passportStates).where(eq(passportStates.clientId, clientId)).limit(1);
  if (!rows[0]) return Response.json({ shelf: [], tastings: [] });
  return Response.json({ shelf: JSON.parse(rows[0].shelfJson), tastings: JSON.parse(rows[0].tastingsJson) });
}

export async function POST(request: Request) {
  const body = await request.json() as { clientId?: string; shelf?: unknown; tastings?: unknown };
  const clientId = body.clientId?.trim().slice(0, 100);
  if (!clientId) return Response.json({ error: "clientId required" }, { status: 400 });
  const shelf = safeArray(body.shelf, 500);
  const tastings = safeArray(body.tastings, 500);
  await getDb().insert(passportStates).values({
    clientId, shelfJson: JSON.stringify(shelf), tastingsJson: JSON.stringify(tastings), updatedAt: new Date().toISOString(),
  }).onConflictDoUpdate({
    target: passportStates.clientId,
    set: { shelfJson: JSON.stringify(shelf), tastingsJson: JSON.stringify(tastings), updatedAt: new Date().toISOString() },
  });
  return Response.json({ ok: true });
}
