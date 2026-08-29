# Mis Contactos (PWA)

Misma app del challenge-1 (agenda de contactos en React), pero convertida en PWA: se puede instalar en el celular y funciona con cache offline.

Materia: Desarrollo de Software para Plataformas Moviles (UAO).

## Demo

https://shiny-melomakarona-b24f12.netlify.app

## Que se le agrego

- Imagen en el componente padre (App.jsx)
- manifest.json + icono propio
- service-worker.js con estrategia hibrida de cache
- registro del service worker en main.jsx

## Sobre la estrategia hibrida

En vez de cachear todo igual, cada tipo de recurso usa la estrategia que mas le conviene:

- HTML -> network first (para no quedarte con una version vieja de la app)
- JS y CSS -> cache first (el nombre del archivo cambia con el hash, asi que es seguro)
- Imagenes -> cache first + stale while revalidate (rapido, y se actualiza atras)
- Llamadas a API -> network first (siempre se prefieren datos frescos)

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

## Correrlo local

```bash
npm install
npm run dev
```

El service worker no se activa con el dev server normal, hay que probarlo con el build:

```bash
npm run build
npm run preview
```

## Instalarla en el celular

Entra al link de arriba desde el navegador del celular.

En Android (Chrome): menu de los 3 puntos -> "Agregar a pantalla de inicio" (a veces sale solo un banner ofreciendo instalarla).

En iPhone (Safari): boton de compartir -> "Agregar a pantalla de inicio".

Queda un icono en el home como cualquier otra app, y abre sin la barra del navegador.

## Ramas del repo

- challenge-1: la app base.
- challenge-2: esta rama, con la PWA.
