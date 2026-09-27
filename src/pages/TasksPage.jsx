import { useState } from 'react'
import { IonButton, IonCheckbox, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSpinner, IonText } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import AppLayout from '../components/AppLayout.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useOnline } from '../context/NetworkContext.jsx'
import useRealTimeCollection from '../hooks/useRealTimeCollection.js'

// Tareas guardadas en Realtime Database: los cambios se ven al instante.
export default function TasksPage() {
  const { user } = useAuth()
  const online = useOnline()
  const { items, loading, error, add, update, remove } = useRealTimeCollection('tasks/' + user.uid)
  const [title, setTitle] = useState('')

  const tasks = [...items].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const clean = title.trim()
    if (!clean) return
    const ok = await add({ title: clean, done: false, createdAt: Date.now() })
    if (ok) setTitle('')
  }

  const toggle = (task) => {
    const { id, ...data } = task
    update(id, { ...data, done: !task.done })
  }

  return (
    <AppLayout title="Tareas" needsNetwork>
      <form onSubmit={handleSubmit}>
        <IonItem>
          <IonInput label="Nueva tarea" labelPlacement="floating" value={title} onIonInput={(e) => setTitle(e.detail.value ?? '')} />
        </IonItem>
        <IonButton type="submit" expand="block" className="ion-margin-top" disabled={!online}>
          Agregar tarea
        </IonButton>
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
      ) : tasks.length === 0 ? (
        <p className="empty-state">Todavía no tienes tareas.</p>
      ) : (
        <IonList>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              <IonCheckbox
                slot="start"
                checked={task.done}
                disabled={!online}
                onIonChange={() => toggle(task)}
                aria-label={'Marcar ' + task.title}
              />
              <IonLabel className={task.done ? 'task-done' : ''}>{task.title}</IonLabel>
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                disabled={!online}
                onClick={() => remove(task.id)}
                aria-label={'Eliminar ' + task.title}
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
