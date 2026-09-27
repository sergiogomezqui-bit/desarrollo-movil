import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database.js'

// CRUD básico para cualquier tabla de Dexie.
// Función nueva: "search" filtra por nombre y la lista se actualiza sola con useLiveQuery.
export default function useDexie(tableName, search = '') {
  const table = db.table(tableName)

  const items = useLiveQuery(() => {
    const term = search.trim().toLowerCase()
    if (!term) return table.toArray()
    return table.filter((item) => item.nombre.toLowerCase().includes(term)).toArray()
  }, [tableName, search])

  const add = (data) => table.add(data)
  const update = (id, data) => table.update(id, data)
  const remove = (id) => table.delete(id)

  return { items: items ?? [], loading: items === undefined, add, update, remove }
}
