# Challenge 9 — Supabase en Ionic

**Nombre:** Sergio Gómez
**Universidad Autónoma de Occidente - Cali**
**Materia:** Desarrollo de Software para Plataformas Móviles

App en Ionic React con Supabase como backend: registro e inicio de sesión, tareas con CRUD y lista en vivo, y foto de perfil tomada con la cámara.

## Qué pide el challenge

- Crear el proyecto en Supabase, la tabla de tareas con RLS y el bucket `avatars`.
- Registro, login, CRUD y lista en vivo.
- Componentes de Ionic y captura de foto con la cámara.

## Qué hace la app

- **Registro y login** con correo y contraseña (Supabase Auth). La sesión se mantiene al cerrar la app.
- **Tareas:** agregar, marcar como completada y borrar. Cada usuario solo ve las suyas (RLS).
- **Lista en vivo:** se actualiza sola con Supabase Realtime cuando cambia la tabla, por ejemplo desde otra pestaña.
- **Perfil:** foto tomada con la cámara que se sube a `avatars/<uid>/avatar.jpg`. Solo se puede escribir en la carpeta propia.

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

La seguridad real está en las políticas RLS, no en ocultar la clave publicable.

## Despliegue

Netlify, con `netlify.toml` y `_redirects` para las rutas de la app. Las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_KEY` se configuran en Netlify.
