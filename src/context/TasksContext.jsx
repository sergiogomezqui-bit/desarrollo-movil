import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext.jsx'

const TasksContext = createContext(null)

const storageKey = (uid) => `tasks_${uid}`

function readTasks(uid) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(uid))) ?? []
  } catch {
    return []
  }
}

export function TasksProvider({ children }) {
  const { user } = useAuth()
  const uid = user?.uid ?? null
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(uid ? readTasks(uid) : [])
  }, [uid])

  const commit = (next) => {
    setTasks(next)
    if (uid) localStorage.setItem(storageKey(uid), JSON.stringify(next))
  }

  const getTask = (id) => tasks.find((t) => t.id === id)

  const addTask = ({ title, description }) => {
    const task = {
      id: crypto.randomUUID(),
      title,
      description,
      done: false,
      createdAt: new Date().toISOString(),
    }
    commit([task, ...tasks])
    return task
  }

  const updateTask = (id, changes) => {
    commit(tasks.map((t) => (t.id === id ? { ...t, ...changes } : t)))
  }

  const toggleTask = (id) => {
    commit(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTask = (id) => {
    commit(tasks.filter((t) => t.id !== id))
  }

  return (
    <TasksContext.Provider value={{ tasks, getTask, addTask, updateTask, toggleTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TasksContext)
  if (!ctx) throw new Error('useTasks debe usarse dentro de TasksProvider')
  return ctx
}
