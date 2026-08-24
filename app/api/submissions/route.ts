import { verifyToken } from "@clerk/backend";
import { getDb } from "../../../db";
import { bottleSubmissions, userConsents } from "../../../db/schema";
import { eq, sql } from "drizzle-orm";

const LICENCE_VERSION = "2026-08-24";
async function userId(request: Request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!token || !secretKey) return null;
  try { return (await verifyToken(token, { secretKey })).sub; } catch { return null; }
}
const clean=(v:unknown,n:number)=>typeof v==="string"?v.trim().slice(0,n):"";

async function ensureTables() {
  await getDb().run(sql`CREATE TABLE IF NOT EXISTS user_consents (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, user_id text NOT NULL UNIQUE, terms_version text NOT NULL, privacy_version text NOT NULL, accepted_at text NOT NULL, marketing_opt_in integer DEFAULT false NOT NULL)`);
  await getDb().run(sql`CREATE TABLE IF NOT EXISTS bottle_submissions (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, user_id text NOT NULL, brand text NOT NULL, expression text NOT NULL, style text NOT NULL, abv text, nom text, notes text, photo_url text, licence_version text NOT NULL, licence_accepted_at text NOT NULL, status text DEFAULT 'pending' NOT NULL, created_at text NOT NULL)`);
}

export async function POST(request: Request) {
  const id=await userId(request);
  if(!id) return Response.json({error:"Sign in required"},{status:401});
  await ensureTables();
  const consent=await getDb().select().from(userConsents).where(eq(userConsents.userId,id)).limit(1);
  if(!consent[0]) return Response.json({error:"Accept the Terms and Privacy Notice first"},{status:403});
  const b=await request.json() as Record<string,unknown>;
  const brand=clean(b.brand,100), expression=clean(b.expression,120), style=clean(b.style,60);
  if(!brand||!expression||!style||b.licenceAccepted!==true) return Response.json({error:"Complete the required fields and accept the submission licence"},{status:400});
  const now=new Date().toISOString();
  await getDb().insert(bottleSubmissions).values({userId:id,brand,expression,style,abv:clean(b.abv,20)||null,nom:clean(b.nom,30)||null,notes:clean(b.notes,1200)||null,photoUrl:clean(b.photoUrl,500)||null,licenceVersion:LICENCE_VERSION,licenceAcceptedAt:now,status:"pending",createdAt:now});
  return Response.json({ok:true,status:"pending"});
}
