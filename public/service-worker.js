const CACHE_NAME = 'contactos-cache-v1'

const APP_SHELL = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  )
  self.clients.claim()
})

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) return cached
    throw error
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)
  if (cached) return cached
  const response = await fetch(request)
  cache.put(request, response.clone())
  return response
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)
  const networkFetch = fetch(request)
    .then((response) => {
      cache.put(request, response.clone())
      return response
    })
    .catch(() => cached)
  return cached || networkFetch
}

// Estrategia hibrida: cada tipo de recurso usa la estrategia mas
// adecuada segun su naturaleza, en vez de una unica estrategia global.
self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // HTML -> Network First: evita servir una version vieja de la app
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(networkFirst(request))
    return
  }

  // JS / CSS -> Cache First: el nombre del archivo trae hash, si cambia el
  // contenido cambia el nombre, asi que cachear agresivo es seguro
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(cacheFirst(request))
    return
  }

  // Imagenes -> Cache First + Stale While Revalidate: prioriza rendimiento
  // pero actualiza el cache en segundo plano
  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  // Llamadas a API -> Network First: siempre se prefieren datos actualizados
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request))
    return
  }

  event.respondWith(cacheFirst(request))
})
