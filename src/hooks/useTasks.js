import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// CRUD de tareas + lista en vivo con Supabase Realtime
export function useTasks(userId) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('tareas')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) setError(err.message)
    else setTasks(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!userId) return
    load()
    // Cualquier cambio en la tabla (desde otra pestana o dispositivo) actualiza la lista
    const channel = supabase
      .channel(`tareas-${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tareas' }, (payload) => {
        setTasks((cur) => {
          if (payload.eventType === 'INSERT') {
            return cur.some((t) => t.id === payload.new.id) ? cur : [payload.new, ...cur]
          }
          if (payload.eventType === 'UPDATE') return cur.map((t) => (t.id === payload.new.id ? payload.new : t))
          if (payload.eventType === 'DELETE') return cur.filter((t) => t.id !== payload.old.id)
          return cur
        })
      })
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, load])

  const add = async (titulo) => {
    const { error: err } = await supabase.from('tareas').insert({ titulo })
    if (err) setError(err.message)
  }

  const toggle = async (task) => {
    const { error: err } = await supabase.from('tareas').update({ completada: !task.completada }).eq('id', task.id)
    if (err) setError(err.message)
  }

  const rename = async (task, titulo) => {
    const { error: err } = await supabase.from('tareas').update({ titulo }).eq('id', task.id)
    if (err) setError(err.message)
  }

  const remove = async (task) => {
    const { error: err } = await supabase.from('tareas').delete().eq('id', task.id)
    if (err) setError(err.message)
  }

  return { tasks, loading, error, add, toggle, rename, remove }
}
