// Service Worker для автономной (офлайн) работы MyEnglish на смартфоне
const CACHE_NAME = "myenglish-offline-v10";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./bundle.js",
  "./css/style.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Установка: кешируем все файлы приложения
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Кеширование файлов для работы офлайн");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Активация: очищаем старые версии кеша
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Удаление старого кеша:", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Перехват запросов: сначала сеть (Network-First), чтобы сразу видеть обновления.
// Если интернета нет (офлайн) — мгновенно отдаем сохраненный кэш!
self.addEventListener("fetch", (event) => {
  // Игнорируем запросы к локальному LM Studio (127.0.0.1)
  if (event.request.url.includes("127.0.0.1") || event.request.url.includes("localhost:1234")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === "GET") {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
      })
  );
});
