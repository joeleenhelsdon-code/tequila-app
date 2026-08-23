import { eq } from "drizzle-orm";
import { verifyToken } from "@clerk/backend";
import { getDb } from "../../../db";
import { passportStates } from "../../../db/schema";

function safeArray(value: unknown, max: number) {
  return Array.isArray(value) ? value.slice(0, max) : [];
}

async function storageId(request: Request, fallbackClientId?: string) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;
  if (token) {
    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) throw new Error("CLERK_SECRET_KEY is not configured");
    try {
      const verified = await verifyToken(token, { secretKey });
      return `clerk:${verified.sub}`;
    } catch {
      return null;
    }
  }
  return fallbackClientId?.trim().slice(0, 100) || null;
}

export async function GET(request: Request) {
  const fallbackClientId = new URL(request.url).searchParams.get("clientId") ?? undefined;
  const clientId = await storageId(request, fallbackClientId);
  if (!clientId) return Response.json({ error: "clientId required" }, { status: 400 });
  const rows = await getDb().select().from(passportStates).where(eq(passportStates.clientId, clientId)).limit(1);
  if (!rows[0]) return Response.json({ shelf: [], tastings: [] });
  return Response.json({ shelf: JSON.parse(rows[0].shelfJson), tastings: JSON.parse(rows[0].tastingsJson) });
}

export async function POST(request: Request) {
  const body = await request.json() as { clientId?: string; shelf?: unknown; tastings?: unknown };
  const clientId = await storageId(request, body.clientId);
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
