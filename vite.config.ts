import vinext from "vinext";
import { defineConfig } from "vite";

const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID ??
  "2c271032-e255-4c64-96dc-b73e49743269";

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
          d1_databases: [{
            binding: "DB",
            database_name: "tequilafi-db",
            database_id: databaseId,
          }],
          r2_buckets: [],
        },
      }),
    ],
  };
});
