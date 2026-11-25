// Asien-Auszeit 2027 – Service Worker (Netz zuerst, bei Offline aus dem Speicher)
const CACHE='auszeit-0.80_69';
const CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','lib/pdf.min.mjs','lib/pdf.worker.min.mjs','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE&&x!=='auszeit-share').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;const u=new URL(r.url);
 if(r.method==='POST'&&u.origin===location.origin&&u.pathname.endsWith('/share-target')){e.respondWith((async()=>{
  try{const f=await r.formData();const c=await caches.open('auszeit-share');const meta={title:f.get('title')||'',text:f.get('text')||'',url:f.get('url')||'',files:[],t:Date.now()};
   const fl=f.getAll('file');for(let k=0;k<fl.length;k++){const x=fl[k];if(x&&typeof x!=='string'&&x.size){const key='./share-file-'+k;await c.put(key,new Response(x,{headers:{'Content-Type':x.type||'application/octet-stream'}}));meta.files.push({key,name:x.name||'datei',type:x.type||''})}}
   await c.put('./share-meta',new Response(JSON.stringify(meta),{headers:{'Content-Type':'application/json'}}))}catch(err){}
  return Response.redirect('./?shared=1',303)})());return}
 if(r.method!=='GET')return;
 const mine=u.origin===location.origin&&!u.pathname.endsWith('version.json');const lib=u.hostname==='cdnjs.cloudflare.com';
 if(!mine&&!lib)return;
 e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r.mode==='navigate'?'index.html':r,cp))}return res}).catch(()=>caches.match(r.mode==='navigate'?'index.html':r).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):Response.error()))))});
