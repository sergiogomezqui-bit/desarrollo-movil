# Mis Contactos

App de React (JavaScript + Vite) que simula una agenda de contactos: carga datos falsos como si vinieran de un servidor, y permite agregar y eliminar contactos.

Proyecto de la materia **Desarrollo de Software para Plataformas Móviles** (UAO).

## Funcionalidad

- Muestra un loader mientras "carga" la lista inicial de contactos (simulado con `setTimeout`).
- Carga una lista inicial de contactos falsos.
- Permite agregar contactos con nombre y teléfono.
- Permite eliminar contactos de la lista.
- App dividida en componentes: `Loader`, `ContactForm`, `ContactList`, `ContactItem`.

## Estructura

```
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

## Cómo correrlo

```bash
npm install
npm run dev
```

## Ramas

- `challenge-1`: app de React base (esta rama).
- `challenge-2`: la misma app convertida en PWA (manifest + service worker con estrategia híbrida).
