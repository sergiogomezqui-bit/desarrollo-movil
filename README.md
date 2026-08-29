# Mis Contactos

App en React (JS + Vite) para practicar lo basico: una agenda de contactos con carga inicial simulada, y poder agregar/eliminar de la lista.

Materia: Desarrollo de Software para Plataformas Moviles (UAO).

## Que hace

Al entrar muestra un loader un rato (simulando que trae los datos de un server), y despues carga una lista de contactos de prueba. Desde ahi se puede agregar un contacto nuevo con nombre y telefono, o eliminar cualquiera de la lista.

Esta dividida en componentes para no tener todo amontonado en un solo archivo: Loader, ContactForm, ContactList y ContactItem.

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

## Correrlo local

```bash
npm install
npm run dev
```

## Ramas del repo

- challenge-1: esta app (la base).
- challenge-2: la misma app pero convertida en PWA.
