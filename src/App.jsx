import { useEffect, useState } from 'react'
import {
  IonApp,
  IonContent,
  IonHeader,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import { seedTasks } from './data/seedTasks.js'
import './App.css'

let nextId = seedTasks.length + 1

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(seedTasks)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const addTask = (title) => {
    setTasks((prev) => [...prev, { id: nextId++, title, done: false }])
  }

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const pending = tasks.filter((t) => !t.done).length

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <div className="loading-state">
            <IonSpinner name="crescent" />
            <p>Cargando tareas...</p>
          </div>
        ) : (
          <>
            <TaskForm onAdd={addTask} />
            <p className="ion-padding-top task-summary">
              {pending} tarea{pending === 1 ? '' : 's'} pendiente{pending === 1 ? '' : 's'} de {tasks.length}
            </p>
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          </>
        )}
      </IonContent>
    </IonApp>
  )
}
