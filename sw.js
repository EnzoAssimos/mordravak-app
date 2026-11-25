// gerado no build: guarda o aplicativo no aparelho para abrir sem internet
const VERSAO = "mordravak-94f506f55a";
const ARQUIVOS = ["assets/CanvasPool-CobN8DT4.js","assets/RenderTargetSystem-DAsoQ-K1.js","assets/browserAll-8vQiaVRZ.js","assets/canvasUtils-DPmzIMhS.js","assets/getTexelRangeRects-DKb6sGv5.js","assets/getTextureBatchBindGroup-Cf5y2Sqj.js","assets/index-7im3bmpS.js","assets/index-B-NrQ8U5.css","assets/init-CDsgI4As.js","assets/poppins-devanagari-700-normal-O-jipLrW.woff2","assets/poppins-devanagari-700-normal-fHs-vx92.woff","assets/poppins-latin-700-normal-BVuQR_eA.woff","assets/poppins-latin-700-normal-Qrb0O0WB.woff2","assets/poppins-latin-ext-700-normal-DctTR6Tg.woff","assets/poppins-latin-ext-700-normal-cby-RkWa.woff2","assets/webworkerAll-BD6ro2Sa.js","icones/icone-180-mascara.png","icones/icone-192.png","icones/icone-512-mascara.png","icones/icone-512.png","manifest.webmanifest"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(["./", ...ARQUIVOS]))); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  if (e.request.mode === "navigate") {
    // a página: tenta a versão nova; sem internet, abre a guardada
    e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); caches.open(VERSAO).then((k) => k.put("./", c)); return r; }).catch(() => caches.match("./")));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request)));
});
