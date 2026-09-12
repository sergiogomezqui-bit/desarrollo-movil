# Parcial 1 — Desarrollo de Plataformas Móviles

**Nombre:** Sergio Gómez
**Universidad Autónoma de Occidente - Cali**
**Rama de entrega:** `parcial-1-sergio-gomez`

Este es el parcial de la clínica MediClinic, tocaba hacer dos apps: una PWA en React y una app en Ionic React, cada una manejando su propia info de pacientes/visitas con `localStorage` (sin backend, tal cual pedía la guía).

```
Parcial 1/
├── pwa-clinica/     -> Punto 1: PWA en React
├── ionic-clinica/   -> Punto 2: App en Ionic React
└── screenshots/     -> Pantallazos de las dos apps funcionando
```

No hay backend en ninguna de las dos, todo queda guardado en el `localStorage` del navegador.

La demo en vivo de esta rama muestra la PWA de pacientes (`pwa-clinica`). La app de Ionic (`ionic-clinica`) se prueba corriendo `npm install && npm run dev` dentro de esa carpeta.

---

## Punto 1 — PWA React (`pwa-clinica`)

App web (PWA) para que la clínica administre sus pacientes.

### Qué tiene

- **Login**
  - Usuarios quemados en el código (`src/context/AuthContext.jsx`), no hay registro:
    - `admin / admin123`
    - `recepcion / recepcion123`
  - Si el login es correcto, queda guardado en `localStorage` y si uno recarga la página sigue logueado.
  - Botón de cerrar sesión.
  - Si el usuario o la clave están mal, sale un mensaje de error en pantalla.
- **Pacientes**
  - Lista de los pacientes que hay registrados.
  - Formulario para agregar paciente: nombre, apellido, CC y teléfono.
  - Valida que el nombre y el apellido no queden vacíos y que la CC sea numérica (entre 6 y 10 dígitos).
  - Todo se guarda en `localStorage`.
- **Buscador**
  - Se puede buscar por nombre, apellido o CC.
  - El estado de la búsqueda vive en el componente papá (`App.jsx`) y la lista ya filtrada se le manda como prop al componente hijo (`PatientList`), tal como pedía el enunciado.
- **Parte PWA**
  - Se configuró con `vite-plugin-pwa` (manifest, iconos y service worker), para que se pueda instalar como app.

### Cómo correrla

```bash
cd pwa-clinica
npm install
npm run dev
```

Y se abre en `http://localhost:5173`.

Si se quiere probar como PWA instalada de una:

```bash
npm run build
npm run preview
```

### Cómo está organizada por dentro

```
pwa-clinica/src/
├── context/AuthContext.jsx   -> login, logout, sesión guardada en localStorage
├── components/
│   ├── Login.jsx
│   ├── PatientForm.jsx       -> formulario y validaciones
│   ├── PatientList.jsx       -> tabla de pacientes (el componente hijo)
│   └── SearchBar.jsx
└── App.jsx                   -> aquí vive el estado de pacientes y de la búsqueda (componente papá)
```

---

## Punto 2 — Ionic React (`ionic-clinica`)

App pensada para que un médico revise las visitas que tiene en el día, hecha con Ionic React.

### Qué tiene

- **Login**
  - Hecho con componentes de Ionic (`IonInput`, `IonButton`, `IonCard`).
  - Médicos fijos en el código (`src/context/AuthContext.jsx`):
    - `dr.rios / rios123`
    - `dr.mora / mora123`
  - Si mete mal el usuario o la clave, sale un `IonToast` avisando el error.
  - La sesión también queda guardada en `localStorage`.
- **Navegación**
  - Ya logueado, aparecen los `IonTabs` de abajo con tres pestañas: **Visitas**, **Pacientes** y **Perfil**.
- **Visitas**
  - Muestra las visitas del día con el paciente, la hora y el estado (con un badge de color).
  - Si uno le da clic a una visita, entra al detalle de esa visita.
  - Ahí se puede ir avanzando el estado: `pendiente → en_camino → finalizada`.
  - Cada cambio de estado queda guardado en `localStorage`.
- **Pacientes**: lista de los pacientes de esta app (son datos aparte, no se cruzan con los de la PWA).
- **Perfil**: info del médico logueado y el botón para cerrar sesión.

### Cómo correrla

```bash
cd ionic-clinica
npm install
npm run dev
```

Se abre en `http://localhost:5174` (o el puerto que diga la terminal, a veces cambia).

### Cómo está organizada por dentro

```
ionic-clinica/src/
├── context/
│   ├── AuthContext.jsx        -> login, logout, sesión en localStorage
│   └── ClinicDataContext.jsx  -> pacientes y visitas, guardado en localStorage
├── data/seed.js                -> unos pacientes y visitas de ejemplo para que no arranque vacío
├── pages/
│   ├── LoginPage.jsx
│   ├── TabsLayout.jsx          -> los IonTabs (Visitas / Pacientes / Perfil)
│   ├── VisitsPage.jsx          -> lista de visitas + entra al detalle
│   ├── VisitDetailPage.jsx     -> detalle de la visita y cambio de estado
│   ├── PatientsPage.jsx
│   └── ProfilePage.jsx
└── App.jsx
```

---

## Condiciones del parcial

- ✅ No se usó backend, todo corre del lado del cliente.
- ✅ Toda la persistencia es con `localStorage` en las dos apps.
- ✅ Cada app usa sus propias llaves de `localStorage`, o sea que no comparten la info de los pacientes entre ellas.

## Capturas

En la carpeta [`screenshots/`](./screenshots) están los pantallazos de las dos apps funcionando (login bien y mal, agregar paciente, buscador, visitas, cambio de estado, los tabs y el perfil).
