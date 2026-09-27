import { useState } from 'react'
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonSearchbar, IonText } from '@ionic/react'
import { createOutline, trashOutline } from 'ionicons/icons'
import AppLayout from '../components/AppLayout.jsx'
import useDexie from '../hooks/useDexie.js'

// Frutas guardadas en Dexie (base de datos del propio dispositivo): funciona sin internet.
export default function FruitsPage() {
  const [search, setSearch] = useState('')
  const { items, add, update, remove } = useDexie('fruits', search)

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  const resetForm = () => {
    setNombre('')
    setPrecio('')
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { nombre: nombre.trim(), precio: Number(precio) }
    if (!data.nombre || !(data.precio > 0)) {
      setError('Escribe el nombre y un precio mayor a 0.')
      return
    }
    try {
      if (editingId) await update(editingId, data)
      else await add(data)
      setError('')
      resetForm()
    } catch {
      setError('Esa fruta ya existe.')
    }
  }

  const startEdit = (fruit) => {
    setEditingId(fruit.id)
    setNombre(fruit.nombre)
    setPrecio(String(fruit.precio))
  }

  return (
    <AppLayout title="Frutas">
      <form onSubmit={handleSubmit}>
        <IonItem>
          <IonInput label="Nombre" labelPlacement="floating" value={nombre} onIonInput={(e) => setNombre(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonInput
            label="Precio"
            labelPlacement="floating"
            type="number"
            value={precio}
            onIonInput={(e) => setPrecio(e.detail.value ?? '')}
          />
        </IonItem>
        <IonButton type="submit" expand="block" className="ion-margin-top">
          {editingId ? 'Guardar cambios' : 'Agregar fruta'}
        </IonButton>
        {editingId && (
          <IonButton fill="clear" expand="block" onClick={resetForm}>
            Cancelar edición
          </IonButton>
        )}
      </form>

      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}

      <IonSearchbar
        placeholder="Buscar fruta"
        value={search}
        onIonInput={(e) => setSearch(e.detail.value ?? '')}
      />

      {items.length === 0 ? (
        <p className="empty-state">No hay frutas para mostrar.</p>
      ) : (
        <IonList>
          {items.map((fruit) => (
            <IonItem key={fruit.id}>
              <IonLabel>
                <h2>{fruit.nombre}</h2>
                <IonNote>${fruit.precio.toLocaleString('es-CO')}</IonNote>
              </IonLabel>
              <IonButton slot="end" fill="clear" onClick={() => startEdit(fruit)} aria-label={'Editar ' + fruit.nombre}>
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton slot="end" fill="clear" color="danger" onClick={() => remove(fruit.id)} aria-label={'Eliminar ' + fruit.nombre}>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      )}
    </AppLayout>
  )
}
