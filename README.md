# Parcial 1 — Desarrollo de Plataformas Móviles

**Autor:** Sergio Gómez
**Rama de entrega:** `parcial-1-sergio-gomez`

La clínica MediClinic necesita dos aplicaciones simples para gestionar pacientes y visitas médicas. Este repositorio contiene ambas soluciones, cada una en su propia carpeta y con su propia persistencia en `localStorage` (no comparten datos entre sí, como exige el enunciado).

```
Parcial 1/
├── pwa-clinica/     -> Ejercicio 1: PWA en React
├── ionic-clinica/   -> Ejercicio 2: App móvil en Ionic React
└── screenshots/     -> Capturas de ambas aplicaciones funcionando
```

No se utiliza backend. Toda la persistencia se realiza con `localStorage`.

---

## Ejercicio 1 — PWA React (`pwa-clinica`)

Aplicación web progresiva para la administración de pacientes.

### Funcionalidades

- **Login**
  - Usuarios fijos definidos en código (`src/context/AuthContext.jsx`):
    - `admin / admin123`
    - `recepcion / recepcion123`
  - Si las credenciales son correctas, la sesión se guarda en `localStorage` y se recupera automáticamente al recargar la página.
  - Botón para cerrar sesión.
  - Mensaje de error en pantalla si las credenciales son incorrectas.
- **Pacientes**
  - Lista de pacientes registrados.
  - Formulario para agregar pacientes con los campos: nombre, apellido, CC y teléfono.
  - Validación de nombre, apellido y cédula (formato numérico de 6 a 10 dígitos).
  - Los pacientes se guardan en `localStorage`.
- **Búsqueda**
  - Buscador por nombre, apellido o CC.
  - El estado del buscador (`search`) vive en el componente padre (`App.jsx`) y la lista ya filtrada se pasa como prop al componente hijo `PatientList`.
- **PWA**
  - Configurada con `vite-plugin-pwa`: manifest, iconos y service worker con actualización automática.

### Cómo ejecutar

```bash
cd pwa-clinica
npm install
npm run dev
```

Abrir `http://localhost:5173`.

Para probar el modo PWA instalado, generar el build de producción:

```bash
npm run build
npm run preview
```

### Estructura relevante

```
pwa-clinica/src/
├── context/AuthContext.jsx   -> login, logout, sesión en localStorage
├── components/
│   ├── Login.jsx
│   ├── PatientForm.jsx       -> formulario + validaciones
│   ├── PatientList.jsx       -> tabla de pacientes (componente hijo)
│   └── SearchBar.jsx
└── App.jsx                   -> estado de pacientes y de búsqueda (componente padre)
```

---

## Ejercicio 2 — Ionic React (`ionic-clinica`)

Aplicación móvil construida con Ionic React para que un médico consulte sus visitas del día.

### Funcionalidades

- **Login**
  - Construido con componentes de Ionic (`IonInput`, `IonButton`, `IonCard`).
  - Médicos fijos definidos en código (`src/context/AuthContext.jsx`):
    - `dr.rios / rios123`
    - `dr.mora / mora123`
  - Si las credenciales son incorrectas se muestra un `IonToast` con el mensaje de error.
  - La sesión se guarda en `localStorage` y se recupera al recargar.
- **Navegación**
  - Después del login se muestran `IonTabs` con tres secciones: **Visitas**, **Pacientes** y **Perfil**.
- **Visitas**
  - Lista de visitas del día, cada una con paciente, hora y estado (badge de color).
  - Al seleccionar una visita se navega al detalle (patrón maestro-detalle dentro de la pestaña Visitas).
  - En el detalle se puede avanzar el estado de la visita siguiendo el flujo:
    `pendiente → en_camino → finalizada`.
  - Los cambios de estado se guardan en `localStorage`.
- **Pacientes**: lista de pacientes atendidos por el médico (datos propios de esta app, no compartidos con la PWA).
- **Perfil**: datos del médico autenticado y botón para cerrar sesión.

### Cómo ejecutar

```bash
cd ionic-clinica
npm install
npm run dev
```

Abrir `http://localhost:5174` (o el puerto que indique Vite).

### Estructura relevante

```
ionic-clinica/src/
├── context/
│   ├── AuthContext.jsx        -> login, logout, sesión en localStorage
│   └── ClinicDataContext.jsx  -> pacientes y visitas, persistidos en localStorage
├── data/seed.js                -> datos iniciales de ejemplo (pacientes y visitas del día)
├── pages/
│   ├── LoginPage.jsx
│   ├── TabsLayout.jsx          -> IonTabs (Visitas / Pacientes / Perfil)
│   ├── VisitsPage.jsx          -> lista + navegación al detalle
│   ├── VisitDetailPage.jsx     -> detalle y cambio de estado
│   ├── PatientsPage.jsx
│   └── ProfilePage.jsx
└── App.jsx
```

---

## Condiciones cumplidas

- ✅ Sin backend: toda la lógica corre en el cliente.
- ✅ Persistencia 100% en `localStorage` en ambas aplicaciones.
- ✅ Las dos aplicaciones usan claves de `localStorage` distintas y no comparten información de pacientes entre ellas.

## Capturas de pantalla

Ver carpeta [`screenshots/`](./screenshots) para la evidencia de ambas aplicaciones funcionando (login correcto e incorrecto, gestión de pacientes, búsqueda, visitas, cambio de estado, tabs y perfil).
