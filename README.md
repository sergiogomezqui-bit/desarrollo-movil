# Challenge 07 - Sensores

App nueva en Ionic React con una pantalla de inicio que tiene un botón por cada sensor, y una página para probar cada uno. Usa los plugins de Capacitor vistos en la Clase 07, cada uno dentro de su custom hook.

## Sensores

| Botón | Plugin de Capacitor | Custom hook | Qué hace |
|-------|---------------------|-------------|----------|
| Geolocalización | `@capacitor/geolocation` | `useGeolocation` | Ubicación una vez (`getCurrentPosition`) o siguiéndola (`watchPosition`) |
| Cámara | `@capacitor/camera` | `useCamera` | Tomar una foto o elegirla de la galería (`getPhoto`) |
| Acelerómetro | `@capacitor/motion` | `useAccelerometer` | Aceleración y orientación del teléfono (`addListener`) |
| Dispositivo | `@capacitor/device` | `useDevice` | Modelo, sistema, batería, idioma e identificador |
| Vibración (Haptics) | `@capacitor/haptics` | `useHaptics` | Vibración, golpes suaves/medios/fuertes y avisos |
| Archivos (Filesystem) | `@capacitor/filesystem` | `useFilesystem` | Crear, leer, listar y borrar archivos de texto (almacenamiento privado de la app) |
| Notificaciones locales | `@capacitor/local-notifications` | `useLocalNotifications` | Programar avisos que el teléfono se manda solo |
| Notificaciones push | `@capacitor/push-notifications` | `usePushNotifications` | Registrar el teléfono y recibir avisos desde Firebase |

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Inicio con los botones |
| `/geolocation` | Geolocalización |
| `/camera` | Cámara |
| `/accelerometer` | Acelerómetro |
| `/device` | Dispositivo |
| `/haptics` | Vibración |
| `/filesystem` | Archivos |
| `/local-notifications` | Notificaciones locales |
| `/push-notifications` | Notificaciones push |

## Qué funciona en el navegador y qué en el teléfono

La demo web sirve para ver cómo es la app, pero los sensores de verdad se prueban en el teléfono.

- Dispositivo, Archivos y Cámara (con `@ionic/pwa-elements`) funcionan en el navegador.
- Geolocalización, Acelerómetro y Notificaciones locales funcionan si el navegador da el permiso.
- Vibración solo hace algo en dispositivos con vibrador.
- Notificaciones push solo funcionan en la app instalada en Android o iOS.

## Correr en local

```bash
npm install
npm run dev
```

## Instalar en el teléfono Android

El proyecto Android ya está en la carpeta `android/` (paquete `co.edu.uao.sensores`). Hace falta tener Android Studio instalado, con el modo desarrollador y la depuración USB activados en el teléfono.

```bash
npm install
npm run build
npx cap sync android
npx cap run android
```

Cada vez que se cambie el código hay que repetir `npm run build` y `npx cap sync android`.

## Notificaciones push con Firebase

La app Android (`co.edu.uao.sensores`) ya está registrada en el proyecto de Firebase `desarrollo-movil-uao`, y su archivo de configuración está en `android/app/google-services.json`. Con la app instalada en el teléfono:

1. Abrir la página "Notificaciones push" y tocar "Registrar este teléfono". Aparece el token del teléfono.
2. En la consola de Firebase, entrar a Messaging y crear una notificación de prueba (o usar "Enviar mensaje de prueba" con ese token).
3. La notificación llega al teléfono y también aparece en la lista de recibidas de la página.

## Estructura

```
src/
  hooks/        # un hook por sensor
  pages/        # Home y una página por sensor
  components/   # SensorPage: estructura común de las páginas
capacitor.config.json
```
