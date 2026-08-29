# Mis Contactos

App de React (JavaScript + Vite) que simula una agenda de contactos: carga datos falsos como si vinieran de un servidor, y permite agregar y eliminar contactos. En esta rama (`challenge-2`) la app se convirtió en una **PWA (Progressive Web App)**.

Proyecto de la materia **Desarrollo de Software para Plataformas Móviles** (UAO).

## Demo (Netlify)

🔗 **Link:** _pendiente de completar tras el deploy en Netlify_

## Funcionalidad

- Muestra un loader mientras "carga" la lista inicial de contactos (simulado con `setTimeout`).
- Carga una lista inicial de contactos falsos.
- Permite agregar contactos con nombre y teléfono.
- Permite eliminar contactos de la lista.
- App dividida en componentes: `Loader`, `ContactForm`, `ContactList`, `ContactItem`.
- Imagen ilustrativa en el componente padre (`App.jsx`).

## PWA — Estrategia híbrida del Service Worker

Se implementaron los 5 pasos vistos en clase: `manifest.json` → conexión en `index.html` → `service-worker.js` en `public/` → registro en `main.jsx` → publicación en HTTPS (Netlify).

En lugar de usar una sola estrategia de cache para todo, el `service-worker.js` aplica una estrategia distinta según el tipo de recurso:

| Recurso      | Estrategia                          | Por qué                                  |
| ------------ | ------------------------------------ | ----------------------------------------- |
| HTML         | Network First                       | Evita servir una versión vieja de la app  |
| JS / CSS     | Cache First                         | El nombre del archivo trae hash (Vite)    |
| Imágenes     | Cache First + Stale While Revalidate | Prioriza rendimiento y actualiza en 2do plano |
| APIs         | Network First                       | Siempre se prefieren datos actualizados   |

## Estructura

```
public/
  manifest.json
  service-worker.js
  icons/
src/
  components/
    Loader.jsx
    ContactForm.jsx
    ContactList.jsx
    ContactItem.jsx
  data/
    fakeContacts.js
  App.jsx
  main.jsx
```

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

El service worker solo se activa sobre `build` de producción servido en HTTPS o `localhost`:

```bash
npm run build
npm run preview
```

## Cómo instalar la app en el celular

1. Abre el link de Netlify de arriba desde el navegador de tu celular (Chrome en Android o Safari en iOS).
2. **Android (Chrome):** toca el menú (⋮) y elige **"Agregar a pantalla de inicio"** / **"Instalar app"**. También puede aparecer un banner automático de instalación.
3. **iOS (Safari):** toca el botón de compartir (⬆️) y elige **"Agregar a pantalla de inicio"**.
4. El ícono de la app quedará en tu pantalla de inicio y se abrirá en modo standalone (sin la barra del navegador), pudiendo funcionar offline gracias al service worker.

## Ramas

- `challenge-1`: app de React base.
- `challenge-2`: la misma app convertida en PWA (esta rama).
