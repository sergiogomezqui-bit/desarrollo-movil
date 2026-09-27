import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useTasks } from '../context/TasksContext.jsx'

export default function TaskFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTask, addTask, updateTask } = useTasks()
  const editing = Boolean(id)
  const existing = editing ? getTask(id) : null

  const [title, setTitle] = useState(existing?.title ?? '')
  const [description, setDescription] = useState(existing?.description ?? '')
  const [error, setError] = useState('')

  if (editing && !existing) return <Navigate to="/tasks" replace />

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) {
      setError('El título es obligatorio.')
      return
    }
    if (editing) {
      updateTask(id, { title: cleanTitle, description: description.trim() })
      navigate('/tasks/' + id, { replace: true })
    } else {
      const created = addTask({ title: cleanTitle, description: description.trim() })
      navigate('/tasks/' + created.id, { replace: true })
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={editing ? '/tasks/' + id : '/tasks'} />
          </IonButtons>
          <IonTitle>{editing ? 'Editar tarea' : 'Nueva tarea'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonInput
              label="Título"
              labelPlacement="floating"
              value={title}
              onIonInput={(e) => setTitle(e.detail.value ?? '')}
            />
          </IonItem>
          <IonItem>
            <IonTextarea
              label="Descripción"
              labelPlacement="floating"
              rows={4}
              value={description}
              onIonInput={(e) => setDescription(e.detail.value ?? '')}
            />
          </IonItem>

          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}

          <IonButton type="submit" expand="block" className="ion-margin-top">
            Guardar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}
