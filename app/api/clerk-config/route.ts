import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

export async function GET() {
  const runtimeEnv = env as unknown as Record<string, string | undefined>;
  return Response.json(
    { publishableKey: runtimeEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
