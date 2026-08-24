import { eq, sql } from "drizzle-orm";
import { verifyToken } from "@clerk/backend";
import { getDb } from "../../../db";
import { userConsents } from "../../../db/schema";

const TERMS_VERSION = "2026-08-24";
const PRIVACY_VERSION = "2026-08-24";

async function userId(request: Request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!token || !secretKey) return null;
  try { return (await verifyToken(token, { secretKey })).sub; } catch { return null; }
}

async function ensureTable() {
  await getDb().run(sql`CREATE TABLE IF NOT EXISTS user_consents (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, user_id text NOT NULL UNIQUE, terms_version text NOT NULL, privacy_version text NOT NULL, accepted_at text NOT NULL, marketing_opt_in integer DEFAULT false NOT NULL)`);
}

export async function GET(request: Request) {
  const id = await userId(request);
  if (!id) return Response.json({ error: "Unauthorized" }, { status: 401 });
  await ensureTable();
  const rows = await getDb().select().from(userConsents).where(eq(userConsents.userId, id)).limit(1);
  const current = rows[0]?.termsVersion === TERMS_VERSION && rows[0]?.privacyVersion === PRIVACY_VERSION;
  return Response.json({ accepted: current, marketingOptIn: rows[0]?.marketingOptIn ?? false, termsVersion: TERMS_VERSION, privacyVersion: PRIVACY_VERSION });
}

export async function POST(request: Request) {
  const id = await userId(request);
  if (!id) return Response.json({ error: "Unauthorized" }, { status: 401 });
  await ensureTable();
  const body = await request.json() as { accepted?: boolean; marketingOptIn?: boolean };
  if (body.accepted !== true) return Response.json({ error: "Acceptance is required" }, { status: 400 });
  const acceptedAt = new Date().toISOString();
  await getDb().insert(userConsents).values({ userId:id, termsVersion:TERMS_VERSION, privacyVersion:PRIVACY_VERSION, acceptedAt, marketingOptIn:!!body.marketingOptIn })
    .onConflictDoUpdate({ target:userConsents.userId, set:{ termsVersion:TERMS_VERSION, privacyVersion:PRIVACY_VERSION, acceptedAt, marketingOptIn:!!body.marketingOptIn } });
  return Response.json({ ok:true, acceptedAt });
}
