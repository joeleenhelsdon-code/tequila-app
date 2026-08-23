import vinext from "vinext";
import { defineConfig } from "vite";

const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID ??
  "00000000-0000-4000-8000-000000000000";

export default defineConfig(async () => {
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    plugins: [
      vinext(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        inspectorPort: false,
        config: {
          main: "./worker/index.ts",
          compatibility_flags: ["nodejs_compat"],
          d1_databases: [{
            binding: "DB",
            database_name: "tequilify-db",
            database_id: databaseId,
          }],
          r2_buckets: [],
        },
      }),
    ],
  };
});
