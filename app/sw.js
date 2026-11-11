
const scope = self.registration.scope;
const prefix = 'los-shell:' + scope + ':';
const cacheName = prefix + "dc3e865eeaf2e3ce1bf8211b";
const urls = ["assets/archivo-narrow-latin-400-normal-BON_owyT.woff2","assets/archivo-narrow-latin-400-normal-nNe3qgr1.woff","assets/archivo-narrow-latin-600-normal-DZkbuzR9.woff","assets/archivo-narrow-latin-600-normal-l2jiltzb.woff2","assets/archivo-narrow-latin-700-normal-DtADLsoy.woff2","assets/archivo-narrow-latin-700-normal-DxmyBkwC.woff","assets/archivo-narrow-latin-ext-400-normal-BzcuidUP.woff2","assets/archivo-narrow-latin-ext-400-normal-DO6227My.woff","assets/archivo-narrow-latin-ext-600-normal-CFDqFZjW.woff","assets/archivo-narrow-latin-ext-600-normal-DNmONYTo.woff2","assets/archivo-narrow-latin-ext-700-normal-C4q0W15T.woff","assets/archivo-narrow-latin-ext-700-normal-DCLoHMFv.woff2","assets/archivo-narrow-vietnamese-400-normal-C2Bhhhro.woff","assets/archivo-narrow-vietnamese-400-normal-uH49xrTy.woff2","assets/archivo-narrow-vietnamese-600-normal-B3iMS2rD.woff2","assets/archivo-narrow-vietnamese-600-normal-BOVNaV0C.woff","assets/archivo-narrow-vietnamese-700-normal-CB0yIOvF.woff","assets/archivo-narrow-vietnamese-700-normal-VsvP8OcS.woff2","assets/barlow-condensed-latin-600-normal-BFJEwTuo.woff","assets/barlow-condensed-latin-600-normal-DepVgxBB.woff2","assets/barlow-condensed-latin-ext-600-normal-18ESti3H.woff2","assets/barlow-condensed-latin-ext-600-normal-Clv9cIcR.woff","assets/barlow-condensed-vietnamese-600-normal-A5AYRdjN.woff2","assets/barlow-condensed-vietnamese-600-normal-CNlPk46_.woff","assets/fraunces-latin-600-normal-BFCDtZfi.woff2","assets/fraunces-latin-600-normal-DL5QCzvS.woff","assets/fraunces-latin-ext-600-normal-B0Dy4lqi.woff","assets/fraunces-latin-ext-600-normal-BtzmzP0X.woff2","assets/fraunces-vietnamese-600-normal-BjlAJixd.woff2","assets/fraunces-vietnamese-600-normal-DlAl5EAR.woff","assets/ibm-plex-mono-cyrillic-400-normal-BSMlKf0J.woff2","assets/ibm-plex-mono-cyrillic-400-normal-CEL4l2ZJ.woff","assets/ibm-plex-mono-cyrillic-600-normal-CTOM6hUh.woff2","assets/ibm-plex-mono-cyrillic-600-normal-fLZuRloM.woff","assets/ibm-plex-mono-cyrillic-ext-400-normal-DMdlQ8Kv.woff","assets/ibm-plex-mono-cyrillic-ext-400-normal-xuaO2J-f.woff2","assets/ibm-plex-mono-cyrillic-ext-600-normal-9HEixskS.woff","assets/ibm-plex-mono-cyrillic-ext-600-normal-V-xxqcpd.woff2","assets/ibm-plex-mono-latin-400-normal-CvHOgSBP.woff","assets/ibm-plex-mono-latin-400-normal-DMJ8VG8y.woff2","assets/ibm-plex-mono-latin-600-normal-BgSNZQsw.woff2","assets/ibm-plex-mono-latin-600-normal-DWFSQ4vo.woff","assets/ibm-plex-mono-latin-ext-400-normal-BmRBH3aV.woff2","assets/ibm-plex-mono-latin-ext-400-normal-D3D2R8hC.woff","assets/ibm-plex-mono-latin-ext-600-normal-D38SheWl.woff2","assets/ibm-plex-mono-latin-ext-600-normal-DmB0ttJJ.woff","assets/ibm-plex-mono-vietnamese-400-normal-BulugwFq.woff2","assets/ibm-plex-mono-vietnamese-400-normal-DDuiU_S-.woff","assets/ibm-plex-mono-vietnamese-600-normal-D2EvbN8M.woff2","assets/ibm-plex-mono-vietnamese-600-normal-iLQfcSjf.woff","assets/imagery-tint.worker-CycSQhpE.js","assets/index-B8tKiVBi.css","assets/index-BmX7C7hb.js","assets/index-Cgytbrzs.js","assets/index-D4Ib6rGF.js","assets/propagation.worker-BRBks2KQ.js","assets/raising-the-mast-DUbBRYs0.webp","assets/web-B0BQiMIR.js","assets/web-BJXVEfnr.js","assets/web-DJoblGZS.js","assets/web-Ddj8pQdQ.js","crest-neon-v1.png","glyphs/Noto Sans Medium/0-255.pbf","glyphs/Noto Sans Medium/256-511.pbf","glyphs/Noto Sans Medium/8192-8447.pbf","glyphs/Noto Sans Regular/0-255.pbf","glyphs/Noto Sans Regular/256-511.pbf","glyphs/Noto Sans Regular/8192-8447.pbf","index.html"].map(file => new URL(file, scope).href);
const assets = new Set(urls);
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(cacheName);
      await cache.addAll(urls.map(url => new Request(url, { cache: 'reload' })));
      await self.skipWaiting();
    } catch (error) {
      await caches.delete(cacheName);
      throw error;
    }
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(prefix) && key !== cacheName) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (!url.href.startsWith(scope)) return;
  const key = request.mode === 'navigate' ? new URL('index.html', scope).href : url.href;
  if (!assets.has(key)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    return await cache.match(key) || fetch(request);
  })());
});
