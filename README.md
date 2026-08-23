# Tequilify

Tequilify is a mobile-friendly tequila discovery, collection and tasting-journal app.

## Cloudflare deployment

The app runs as a Vinext Cloudflare Worker with a D1 database.

1. Create a D1 database named `tequilify-db`.
2. Add its database ID as the build variable `CLOUDFLARE_D1_DATABASE_ID`.
3. Apply the migration in `drizzle/0000_sad_morg.sql` to the database.
4. Use `npm run build` as the build command.
5. Use `npx wrangler deploy -c dist/server/wrangler.json` as the deploy command.
6. Attach `tequilify.com` under the Worker's **Settings → Domains & Routes**.

The D1 binding must be named `DB`.
