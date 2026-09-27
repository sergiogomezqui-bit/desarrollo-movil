# Challenge 05 - Tareas con Firebase

La app de tareas (Challenge 03) ahora con inicio de sesión real usando Firebase Authentication, contextos y custom hooks. Hecha con Ionic React + Vite.

## Qué hace

- Registro, inicio y cierre de sesión con Firebase (correo y contraseña).
- Páginas con rutas: Login, Register, lista de tareas, agregar/editar tarea y detalle de tarea.
- Las páginas de tareas están protegidas: si no hay sesión, redirige al login.
- Cada usuario ve solo sus propias tareas.

## Cómo está organizado

- `AuthContext`: maneja los datos de login/registro y la sesión.
- `TasksContext`: maneja los datos de las tareas para todas las páginas (las tareas se guardan en `localStorage` por usuario).
- `hooks/useFirebaseAuth.js`: custom hook con toda la lógica de Firebase (login, registro, logout y escucha de la sesión).

```
src/
  firebase/config.js            # configuración de Firebase
  hooks/useFirebaseAuth.js      # lógica de Firebase Auth
  context/AuthContext.jsx       # contexto de login/registro
  context/TasksContext.jsx      # contexto de tareas
  components/RequireAuth.jsx    # protege las rutas
  pages/                        # Login, Register, lista, formulario y detalle
```

## Rutas

| Ruta | Página |
|------|--------|
| `/login` | Iniciar sesión |
| `/register` | Crear cuenta |
| `/tasks` | Lista de tareas |
| `/tasks/new` | Agregar tarea |
| `/tasks/:id` | Detalle de la tarea |
| `/tasks/:id/edit` | Editar tarea |

## Correr en local

```bash
npm install
npm run dev
```
