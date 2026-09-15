import { useState } from 'react'
import { IonButton, IonInput, IonItem } from '@ionic/react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <IonItem>
        <IonInput
          label="Nueva tarea"
          labelPlacement="floating"
          placeholder="Ej: Estudiar para el parcial"
          value={title}
          onIonInput={(e) => setTitle(e.detail.value ?? '')}
        />
      </IonItem>
      <IonButton type="submit" expand="block" className="ion-margin-top">
        Agregar tarea
      </IonButton>
    </form>
  )
}
