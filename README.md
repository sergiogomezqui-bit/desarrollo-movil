# Challenge 04 - Ionic Login Demo

App Ionic React que implementa el flujo de login/persistencia pedido en la Clase 04 (routing + localStorage):

- Pagina de login con `email` y `password`.
- Boton "Login" que valida contra las credenciales de la actividad: `user@mail.com` / `123`.
- Si son correctas, se guarda un token `logged = true` en `localStorage` y se redirige a la pagina de Lista.
- Si se recarga la app o se vuelve a entrar, se revisa `localStorage` y, si ya esta logueado, no hay que volver a iniciar sesion (salta directo a la Lista).
- Boton "Logout" en la Lista: limpia el token y redirige de vuelta al Login.

## Correr en local

```bash
npm install
npm run dev
```

## Estructura

```
src/
  App.jsx                     # rutas: /login, /list
  context/AuthContext.jsx      # login/logout + persistencia en localStorage
  pages/LoginPage.jsx           # formulario de email/password
  pages/ListPage.jsx             # pagina protegida + boton logout
```
