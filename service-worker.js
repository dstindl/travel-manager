// Asien-Auszeit 2027 – Service Worker (Netz zuerst, bei Offline aus dem Speicher)
const CACHE='auszeit-0.80_34';
const CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 const mine=u.origin===location.origin&&!u.pathname.endsWith('version.json');const lib=u.hostname==='cdnjs.cloudflare.com';
 if(!mine&&!lib)return;
 e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r.mode==='navigate'?'index.html':r,cp))}return res}).catch(()=>caches.match(r.mode==='navigate'?'index.html':r).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):Response.error()))))});
