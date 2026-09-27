import { useState } from 'react'
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSpinner,
  IonText,
} from '@ionic/react'
import { createOutline, trashOutline } from 'ionicons/icons'
import AppLayout from '../components/AppLayout.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useOnline } from '../context/NetworkContext.jsx'
import useCollection from '../hooks/useCollection.js'

// Contactos guardados en Firestore (cada usuario ve solo los suyos).
export default function ContactsPage() {
  const { user } = useAuth()
  const online = useOnline()
  const { items, loading, error, add, update, remove } = useCollection('contacts', [['uid', '==', user.uid]])

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [editingId, setEditingId] = useState(null)

  const resetForm = () => {
    setName('')
    setPhone('')
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { name: name.trim(), phone: phone.trim() }
    if (!data.name || !data.phone) return
    const ok = editingId ? await update(editingId, data) : await add({ ...data, uid: user.uid })
    if (ok) resetForm()
  }

  const startEdit = (contact) => {
    setEditingId(contact.id)
    setName(contact.name)
    setPhone(contact.phone)
  }

  return (
    <AppLayout title="Contactos" needsNetwork>
      <form onSubmit={handleSubmit}>
        <IonItem>
          <IonInput label="Nombre" labelPlacement="floating" value={name} onIonInput={(e) => setName(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonInput
            label="Teléfono"
            labelPlacement="floating"
            type="tel"
            value={phone}
            onIonInput={(e) => setPhone(e.detail.value ?? '')}
          />
        </IonItem>
        <IonButton type="submit" expand="block" className="ion-margin-top" disabled={!online}>
          {editingId ? 'Guardar cambios' : 'Agregar contacto'}
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

      {loading ? (
        <div className="center-state">
          <IonSpinner name="crescent" />
        </div>
      ) : items.length === 0 ? (
        <p className="empty-state">Todavía no tienes contactos.</p>
      ) : (
        <IonList>
          {items.map((contact) => (
            <IonItem key={contact.id}>
              <IonLabel>
                <h2>{contact.name}</h2>
                <IonNote>{contact.phone}</IonNote>
              </IonLabel>
              <IonButton slot="end" fill="clear" disabled={!online} onClick={() => startEdit(contact)} aria-label={'Editar ' + contact.name}>
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                disabled={!online}
                onClick={() => remove(contact.id)}
                aria-label={'Eliminar ' + contact.name}
              >
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      )}
    </AppLayout>
  )
}
