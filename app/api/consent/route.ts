import { eq, sql } from "drizzle-orm";
import { verifyToken } from "@clerk/backend";
import { getDb } from "../../../db";
import { consentEmailEvents, userConsents } from "../../../db/schema";

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
  await getDb().run(sql`CREATE TABLE IF NOT EXISTS consent_email_events (event_key text PRIMARY KEY NOT NULL, user_id text NOT NULL, terms_version text NOT NULL, privacy_version text NOT NULL, provider_message_id text, sent_at text NOT NULL)`);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" })[character] ?? character);
}

async function sendConsentEmail(userId: string, acceptedAt: string) {
  const secretKey = process.env.CLERK_SECRET_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "TequilaFi <hello@tequilafi.com>";
  if (!secretKey || !resendKey) return { sent:false, reason:"not_configured" } as const;

  const eventKey = `${userId}:${TERMS_VERSION}:${PRIVACY_VERSION}`;
  const existing = await getDb().select().from(consentEmailEvents).where(eq(consentEmailEvents.eventKey, eventKey)).limit(1);
  if (existing[0]) return { sent:true, duplicate:true } as const;

  const clerkResponse = await fetch(`https://api.clerk.com/v1/users/${encodeURIComponent(userId)}`, {
    headers: { authorization:`Bearer ${secretKey}` },
  });
  if (!clerkResponse.ok) return { sent:false, reason:"user_lookup_failed" } as const;
  const clerkUser = await clerkResponse.json() as {
    first_name?: string | null;
    primary_email_address_id?: string | null;
    email_addresses?: Array<{ id:string; email_address:string }>;
  };
  const email = clerkUser.email_addresses?.find(item => item.id === clerkUser.primary_email_address_id)?.email_address
    ?? clerkUser.email_addresses?.[0]?.email_address;
  if (!email) return { sent:false, reason:"email_missing" } as const;
  const greeting = clerkUser.first_name ? `Hi ${escapeHtml(clerkUser.first_name)},` : "Welcome to TequilaFi,";

  const response = await fetch("https://api.resend.com/emails", {
    method:"POST",
    headers:{ authorization:`Bearer ${resendKey}`, "content-type":"application/json", "idempotency-key":eventKey },
    body:JSON.stringify({
      from,
      to:[email],
      reply_to:"joeleen@thejoeleeneffect.co.za",
      subject:"Your TequilaFi terms and privacy confirmation",
      html:`<div style="font-family:Arial,sans-serif;line-height:1.6;color:#0b1f3a;max-width:640px;margin:auto"><h1>TequilaFi</h1><p>${greeting}</p><p>This confirms that you accepted the TequilaFi Terms of Use and acknowledged the Privacy Notice on <strong>${escapeHtml(new Date(acceptedAt).toUTCString())}</strong>.</p><h2>Terms of Use — version ${TERMS_VERSION}</h2><p>You must be legally old enough to consume alcohol in your country. TequilaFi provides educational and community information, not medical advice or a guarantee about any product.</p><p>You are responsible for your account and anything you submit. Do not upload unlawful, misleading or infringing material. Bottle submissions are reviewed and may be edited, rejected or removed.</p><p>You keep ownership of your content. When you submit bottle information, photographs or notes, you grant TequilaFi a worldwide, non-exclusive, royalty-free licence to store, reproduce, adapt, publish and display that content for operating and promoting TequilaFi.</p><h2>Privacy Notice — version ${PRIVACY_VERSION}</h2><p>TequilaFi uses your Clerk account details, shelf and tasting records, bottle submissions, consent records and basic technical or security logs to provide and secure the service. Clerk provides authentication and Cloudflare provides hosting and database services.</p><p>Marketing email is optional and requires separate consent. You can request access, correction or deletion by replying to this email or contacting <a href="mailto:joeleen@thejoeleeneffect.co.za">joeleen@thejoeleeneffect.co.za</a>.</p><p><a href="https://www.tequilafi.com" style="display:inline-block;background:#c9a54c;color:#0b1f3a;padding:12px 20px;text-decoration:none;font-weight:bold;border-radius:8px">Open TequilaFi</a></p><p style="font-size:12px;color:#52606d">Keep this email for your records.</p></div>`,
    }),
  });
  if (!response.ok) return { sent:false, reason:"delivery_failed" } as const;
  const result = await response.json() as { id?:string };
  await getDb().insert(consentEmailEvents).values({ eventKey, userId, termsVersion:TERMS_VERSION, privacyVersion:PRIVACY_VERSION, providerMessageId:result.id ?? null, sentAt:new Date().toISOString() }).onConflictDoNothing();
  return { sent:true } as const;
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
  let emailConfirmation: Awaited<ReturnType<typeof sendConsentEmail>> = { sent:false, reason:"delivery_failed" };
  try { emailConfirmation = await sendConsentEmail(id, acceptedAt); } catch { /* Consent must not fail because email is unavailable. */ }
  return Response.json({ ok:true, acceptedAt, emailConfirmation });
}
