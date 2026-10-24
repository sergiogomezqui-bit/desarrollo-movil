# Parcial 2 — Misiones

**Nombre:** Sergio Gómez
**Universidad Autónoma de Occidente - Cali**
**Materia:** Desarrollo de Software para Plataformas Móviles

App en Ionic + React donde el usuario se registra, inicia sesión y completa tres misiones para ganar puntos.

## Misiones

| # | Misión | Cómo se completa | Puntos |
|---|---|---|---|
| 1 | Evidencia | Se toma una foto con la cámara y se guarda | 30 |
| 2 | Movimiento real | El GPS detecta que el usuario se alejó 50 m de su posición original | 50 |
| 3 | Permanencia activa | Se habilita al terminar la 2. El acelerómetro mide 10 s seguidos sin moverse y el celular vibra | 40 |

Notas:
- El enunciado menciona 30 m en una parte y 50 m en otra; se usa **50 m** (constante `MOVE_METERS` en `src/helpers/index.js`).
- Si el enunciado se interpreta con 30 m, basta cambiar `MOVE_METERS` a 30.
- Moverse durante la misión 3 reinicia la cuenta de los 10 segundos. La vibración no bloquea la pantalla.
- El botón "Simular +10 m" sirve para probar la misión 2 en un computador sin GPS.

## Qué cumple del enunciado

- Usuarios reales con registro e inicio de sesión (Firebase Authentication).
- Pantalla principal con las 3 misiones, estado y puntos de cada una.
- Misión 1 con la cámara, misión 2 con el GPS (se calcula la distancia al punto original), misión 3 con el acelerómetro y vibración al terminar.
- Puntos acumulados, barra de progreso y pantalla de resultados.
- Persistencia local y en Firebase con el formato pedido, y envío de puntos a Firebase.
- Notificaciones locales y ranking top 5 con tu puesto frente a los otros 4.
- Ionic + React, hooks, contextos, Capacitor (Camera, Geolocation, Haptics, Local Notifications, Motion).

## Capturas

Tomadas con la app corriendo en Chrome en tamaño de celular (375x812). La cámara, el GPS y el acelerómetro se simularon en el navegador (cámara y ubicación falsas); en el celular real usan los sensores del equipo.

| Captura | Qué muestra |
|---|---|
| `capturas/01-misiones-inicio.jpg` | Lista de misiones sin completar |
| `capturas/03-mision-movimiento.jpg` | Misión 1 hecha y misión 2 en curso (24.5 / 50 m) |
| `capturas/04-mision-permanencia.jpg` | Misión 3 en curso (quieto 5 / 10 s) |
| `capturas/05-misiones-completas.jpg` | 120 / 120 puntos, 100 % |
| `capturas/06-ranking.jpg` | Ranking top 5 |
| `capturas/07-resultados.jpg` | Resultados |

## Pantallas

- **Misiones:** lista con estado (pendiente/completada), puntos, total acumulado y barra de progreso.
- **Ranking:** top 5 en tiempo real. Los rivales son los usuarios reales con mayor puntaje en Firestore; si hay menos de 4, se completa con usuarios de ejemplo (marcados "ejemplo").
- **Resultados:** puntos totales, misiones completadas y estado general.

## Persistencia

Cada cambio se guarda en `localStorage` y en Firestore (`scores/{uid}`) con esta forma:

```json
{ "points": 120, "missions": [ { "id": 1, "completed": true } ] }
```

Al abrir la app se unen ambos avances: una misión completada no se pierde.

## Notificaciones locales

- "Has completado una misión" al completar cada una.
- "Te falta 1 misión para completar" cuando solo queda una.

## Tecnologías

Ionic 8, React 18, Vite, SCSS Modules, Firebase (Auth + Firestore), Capacitor (Camera, Geolocation, Haptics, Local Notifications, Motion).

## Estructura

```
src/
├── helpers/     index.js (reglas y cálculos), notify.js
├── context/     AuthContext, MissionsContext
├── hooks/       useMovement, useStillness, useRanking
├── routes/      AppRoutes, UserRoutes
├── pages/       Login, Register, Home, Ranking, Results
└── components/  Index/MissionCard, Shared/ProgressSummary
```

## Cómo ejecutarlo

1. Copiar `.env.example` a `.env` y completar las credenciales de Firebase (Authentication con correo/contraseña activado).
2. Publicar las reglas con `firebase deploy --only firestore:rules`. El archivo [firestore.rules](firestore.rules) ya trae las reglas del proyecto UAO Ride y la de `scores`, porque comparten el mismo proyecto de Firebase. Sin ellas la app funciona con guardado local, pero no sincroniza ni muestra el ranking real.
3. ```bash
   npm install
   npm run dev
   ```
4. App nativa:
   ```bash
   npm run build
   npx cap add android
   npx cap sync
   npx cap open android
   ```
   Los permisos de cámara, ubicación, vibración y notificaciones ya están en `android/app/src/main/AndroidManifest.xml`. El APK de depuración se genera con `cd android && ./gradlew assembleDebug` (requiere JDK 17 o 21 y el SDK de Android) y queda en `android/app/build/outputs/apk/debug/`.

## Ranking

Los rivales son los usuarios reales con más puntos en Firestore. Los usuarios de ejemplo solo aparecen mientras haya menos de 4 usuarios reales; a medida que se registren más, desaparecen.
