import { useEffect, useState } from 'react'
import { onValue, push, ref, remove as removeRef, set } from 'firebase/database'
import { rtdb } from '../firebase/config.js'

// CRUD básico para una ruta de Realtime Database. onValue mantiene la lista actualizada sola.
export default function useRealTimeCollection(path) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = onValue(
      ref(rtdb, path),
      (snapshot) => {
        const value = snapshot.val() ?? {}
        setItems(Object.entries(value).map(([id, data]) => ({ id, ...data })))
        setError('')
        setLoading(false)
      },
      () => {
        setError('No se pudieron cargar los datos.')
        setLoading(false)
      },
    )
    return unsubscribe
  }, [path])

  const run = async (action) => {
    try {
      await action()
      return true
    } catch {
      setError('No se pudo completar la acción.')
      return false
    }
  }

  const add = (data) => run(() => push(ref(rtdb, path), data))
  const update = (id, data) => run(() => set(ref(rtdb, path + '/' + id), data))
  const remove = (id) => run(() => removeRef(ref(rtdb, path + '/' + id)))

  return { items, loading, error, add, update, remove }
}
