# Challenge 06 - Contactos, Tareas y Frutas

App nueva en Ionic React con inicio de sesión real (Firebase) y rutas, que junta lo de los desafíos anteriores usando una base de datos distinta para cada cosa.

## Qué hace

| Sección | Dónde se guarda | Requiere internet |
|---------|-----------------|-------------------|
| Contactos | Firebase Firestore | Sí |
| Tareas | Firebase Realtime Database (se actualiza al instante) | Sí |
| Frutas | Dexie (base de datos local del dispositivo) | No |

- Login, registro y cierre de sesión con Firebase Authentication.
- Cada usuario ve solo sus propios contactos y tareas.
- Con el plugin `@capacitor/network` la app detecta si hay conexión. Si no hay, los botones de agregar, editar y eliminar de Contactos y Tareas se deshabilitan y se muestra un aviso. Frutas sigue funcionando porque es local.
- Función nueva en el hook de Dexie: buscar frutas por nombre.

## Custom hooks

- `useFirebaseAuth`: login, registro, logout y sesión.
- `useCollection`: CRUD de una colección de Firestore (con filtros).
- `useRealTimeCollection`: CRUD de Realtime Database, escuchando cambios con `onValue`.
- `useDexie`: CRUD de una tabla de Dexie con `useLiveQuery` y búsqueda.
- `useNetwork`: estado de la conexión.

## Rutas

| Ruta | Página |
|------|--------|
| `/login` | Iniciar sesión |
| `/register` | Crear cuenta |
| `/contacts` | Contactos (Firestore) |
| `/tasks` | Tareas (Realtime Database) |
| `/fruits` | Frutas (Dexie) |

## Estructura

```
src/
  firebase/config.js        # configuración de Firebase (Auth, Firestore y Realtime)
  db/database.js            # base de datos de Dexie
  hooks/                    # useFirebaseAuth, useCollection, useRealTimeCollection, useDexie, useNetwork
  context/                  # AuthContext y NetworkContext
  components/               # RequireAuth y AppLayout
  pages/                    # Login, Register, Contacts, Tasks, Fruits
```

## Reglas de seguridad usadas en Firebase

Firestore:

```
match /contacts/{contactId} {
  allow read, update, delete: if request.auth != null && resource.data.uid == request.auth.uid;
  allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
}
```

Realtime Database:

```
{ "rules": { "tasks": { "$uid": { ".read": "auth != null && auth.uid === $uid", ".write": "auth != null && auth.uid === $uid" } } } }
```

## Correr en local

```bash
npm install
npm run dev
```
