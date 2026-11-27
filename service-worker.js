// Asien-Auszeit 2027 – Service Worker (Netz zuerst, bei Offline aus dem Speicher)
const CACHE='auszeit-0.91_15';
const CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','lib/pdf.min.mjs','lib/pdf.worker.min.mjs','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css','https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE&&x!=='auszeit-share').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Seiten unter ihrem eigenen Pfad speichern (Hauptordner = index.html), damit /alt/ die neue App nie überschreibt
const pageKey=u=>{const base=self.registration.scope;let p=u.href.split('#')[0].split('?')[0];if(p.endsWith('/'))p+='index.html';return p.startsWith(base)?p:base+'index.html'};
self.addEventListener('fetch',e=>{const r=e.request;const u=new URL(r.url);
 if(r.method==='POST'&&u.origin===location.origin&&u.pathname.endsWith('/share-target')){e.respondWith((async()=>{
  try{const f=await r.formData();const c=await caches.open('auszeit-share');const meta={title:f.get('title')||'',text:f.get('text')||'',url:f.get('url')||'',files:[],t:Date.now()};
   const fl=f.getAll('file');for(let k=0;k<fl.length;k++){const x=fl[k];if(x&&typeof x!=='string'&&x.size){const key='./share-file-'+k;await c.put(key,new Response(x,{headers:{'Content-Type':x.type||'application/octet-stream'}}));meta.files.push({key,name:x.name||'datei',type:x.type||''})}}
   await c.put('./share-meta',new Response(JSON.stringify(meta),{headers:{'Content-Type':'application/json'}}))}catch(err){}
  return Response.redirect('./?shared=1',303)})());return}
 if(r.method!=='GET')return;
 const mine=u.origin===location.origin&&!u.pathname.endsWith('version.json');const lib=u.hostname==='cdnjs.cloudflare.com'||u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com';
 if(!mine&&!lib)return;
 const nav=r.mode==='navigate';const key=nav?pageKey(u):r;
 const net=mine?fetch(nav?u.href:r.url,{cache:'no-cache',credentials:'same-origin'}):fetch(r);
 e.respondWith(net.then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(key,cp))}return res})
  .catch(()=>caches.match(key).then(m=>m||(nav?caches.match(self.registration.scope+'index.html').then(x=>x||caches.match('index.html')):Response.error()))))});
