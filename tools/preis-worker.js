// Auszeit 2027 – Preis-Dienst (Cloudflare Worker) · Version 2
// Leitet Anfragen der App an SerpApi (Google Hotels, Google Flights, Google-Maps-Routen) und an den Tripadvisor-Preisvergleich (Xotelo) weiter.
// Geheimnisse (unter Settings → Variables and Secrets): SERPAPI_KEY, APP_TOKEN
const ENGINES = ['google_hotels', 'google_hotels_autocomplete', 'google_flights', 'google_maps_directions'];
export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'x-app-token, content-type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '86400'
    };
    const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, 'content-type': 'application/json; charset=utf-8' } });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'GET') return json({ error: 'nur GET' }, 405);
    if (!env.APP_TOKEN || req.headers.get('x-app-token') !== env.APP_TOKEN) return json({ error: 'Token falsch' }, 401);
    const u = new URL(req.url);
    let target;
    if (u.pathname === '/ping') return json({ ok: true, serpapi: !!env.SERPAPI_KEY, v: 2, engines: ENGINES });
    if (u.pathname.startsWith('/xotelo/')) {
      const ep = u.pathname.slice(8);
      if (!['rates', 'search', 'list', 'heatmap'].includes(ep)) return json({ error: 'unbekannt' }, 404);
      target = 'https://data.xotelo.com/api/' + ep + u.search;
    } else if (u.pathname === '/hotels' || u.pathname === '/serp') {
      if (!env.SERPAPI_KEY) return json({ error: 'SERPAPI_KEY fehlt im Worker' }, 500);
      const p = new URLSearchParams(u.search);
      const eng = p.get('engine') || 'google_hotels';
      if (!ENGINES.includes(eng)) return json({ error: 'engine nicht erlaubt' }, 400);
      p.set('engine', eng);
      p.set('api_key', env.SERPAPI_KEY);
      target = 'https://serpapi.com/search.json?' + p.toString();
    } else return json({ error: 'unbekannt' }, 404);
    const r = await fetch(target, { cf: { cacheTtl: 3600, cacheEverything: true } });
    const body = await r.text();
    return new Response(body, { status: r.status, headers: { ...cors, 'content-type': 'application/json; charset=utf-8', 'cache-control': 'private, max-age=1800' } });
  }
};
