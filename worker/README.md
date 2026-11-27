# Preis-Dienst (Cloudflare Worker)

Der Code liegt in `tools/preis-worker.js`. Cloudflare baut und veröffentlicht ihn automatisch aus diesem Repository:

- Worker: `auszeit2027hotelpreise`
- Root directory: `worker`
- Build command: leer
- Deploy command: `npx wrangler deploy`

Die Secrets `SERPAPI_KEY` und `APP_TOKEN` bleiben im Worker bei Cloudflare und stehen nie in diesem Repository.
