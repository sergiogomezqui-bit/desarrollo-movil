# Challenge 03 - Ionic Task Manager

App de gestion de tareas construida con Ionic React (Vite), siguiendo el enunciado de la Clase 03:

- Usa componentes propios de Ionic (`IonList`, `IonItem`, `IonCheckbox`, `IonInput`, `IonSpinner`, etc.)
- Estado y efectos: `useState` para las tareas, `useEffect` para simular una carga inicial con loader.
- Componentes padre/hijo (mas de 3): `App` (padre) -> `TaskForm`, `TaskList` -> `TaskItem`.
- Ver una lista de tareas.
- Agregar tareas nuevas.
- Marcar tareas como completadas.
- Eliminar tareas.

## Correr en local

```bash
npm install
npm run dev
```

## Estructura

```
src/
  App.jsx                  # componente padre: estado de tareas + loading
  components/
    TaskForm.jsx            # formulario para agregar tareas
    TaskList.jsx             # lista, delega cada fila a TaskItem
    TaskItem.jsx              # una tarea: checkbox, texto, boton eliminar
  data/seedTasks.js         # datos iniciales simulando una carga async
```
