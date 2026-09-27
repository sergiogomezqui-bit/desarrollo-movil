import { useCallback, useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase/config.js'

// CRUD básico para cualquier colección de Firestore.
// filters: [["campo", "==", valor], ...]
export default function useCollection(name, filters = []) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const filtersKey = JSON.stringify(filters)

  const getAll = useCallback(async () => {
    setLoading(true)
    try {
      const conditions = JSON.parse(filtersKey).map(([field, op, value]) => where(field, op, value))
      const snapshot = await getDocs(query(collection(db, name), ...conditions))
      setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
      setError('')
    } catch {
      setError('No se pudieron cargar los datos.')
    } finally {
      setLoading(false)
    }
  }, [name, filtersKey])

  useEffect(() => {
    getAll()
  }, [getAll])

  const run = async (action) => {
    try {
      await action()
      await getAll()
      return true
    } catch {
      setError('No se pudo completar la acción.')
      return false
    }
  }

  const add = (data) => run(() => addDoc(collection(db, name), data))
  const update = (id, data) => run(() => updateDoc(doc(db, name, id), data))
  const remove = (id) => run(() => deleteDoc(doc(db, name, id)))

  return { items, loading, error, getAll, add, update, remove }
}
