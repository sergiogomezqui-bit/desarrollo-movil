# Challenge 9 — Supabase en Ionic

**Nombre:** Sergio Gómez
**Universidad Autónoma de Occidente - Cali**
**Materia:** Desarrollo de Software para Plataformas Móviles

App en Ionic React con Supabase como backend: registro e inicio de sesión, tareas con CRUD y lista en vivo, y foto de perfil tomada con la cámara.

Demo: https://challenge-9--portafoliodesarrollomovil.netlify.app

## Qué pide el challenge

- Crear el proyecto en Supabase, la tabla de tareas con RLS y el bucket `avatars`.
- Registro, login, CRUD y lista en vivo.
- Componentes de Ionic y captura de foto con la cámara.

## Qué hace la app

- **Registro y login** con correo y contraseña (Supabase Auth). La sesión se mantiene al cerrar la app. En el proyecto de la demo "Confirm email" está desactivado, como permite la clase para desarrollo.
- **Tareas:** agregar, marcar como completada y borrar. Cada usuario solo ve las suyas (RLS).
- **Lista en vivo:** se actualiza sola con Supabase Realtime cuando cambia la tabla, por ejemplo desde otra pestaña.
- **Perfil:** foto tomada con la cámara que se sube a `avatars/<uid>/avatar.jpg`. Solo se puede escribir y leer dentro de la carpeta propia.

## Lo que se probó

- Registro y entrada automática a la lista de tareas.
- Crear 3 tareas, marcar una como completada y ver el contador.
- Una tarea insertada por la API con la misma sesión (como otro dispositivo) apareció sola en la lista.
- Subir la foto de perfil y mostrarla desde el bucket.
- Sin sesión, la API no devuelve tareas (0), no deja insertar (401) y no deja subir archivos al bucket.

La cámara y la galería se probaron en Chrome con una imagen de prueba; en el celular real usan la cámara del equipo.

| Captura | Qué muestra |
|---|---|
| `capturas/01-tareas.jpg` | Lista de tareas en vivo |
| `capturas/02-perfil-avatar.jpg` | Perfil con la foto subida a Storage |

## Estructura

```
src/
├── lib/        supabase.js (un solo cliente)
├── context/    AuthContext
├── hooks/      useTasks (CRUD + realtime), useAvatar (cámara + Storage)
├── routes/     AppRoutes, UserRoutes
└── pages/      Login, Register, Tasks, Profile
supabase/schema.sql   tabla, políticas RLS, realtime y bucket
```

## Cómo ejecutarlo

1. Crear un proyecto en [supabase.com](https://supabase.com) (plan Free).
2. En **SQL Editor** ejecutar [supabase/schema.sql](supabase/schema.sql).
3. En **Authentication → Providers** dejar Email activo. Para pruebas se puede desactivar "Confirm email".
4. Copiar `.env.example` a `.env` y completar `VITE_SUPABASE_URL` y `VITE_SUPABASE_KEY` (clave publicable, nunca la `secret`).
5. ```bash
   npm install
   npm run dev
   ```

La seguridad real está en las políticas RLS, no en ocultar la clave publicable. Por eso `.env.production` trae la URL y la clave publicable del proyecto de la demo, y la clave `secret` no está en ningún archivo.

## Despliegue

Netlify, con `netlify.toml` y `_redirects` para las rutas de la app. Cada rama se publica como `<rama>--portafoliodesarrollomovil.netlify.app`.
