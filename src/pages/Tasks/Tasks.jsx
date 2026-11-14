import { useState } from 'react'
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { addOutline, trashOutline } from 'ionicons/icons'
import { useAuth } from '../../context/AuthContext'
import { useTasks } from '../../hooks/useTasks'

export default function Tasks() {
  const { user } = useAuth()
  const { tasks, loading, error, add, toggle, remove } = useTasks(user.id)
  const [titulo, setTitulo] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const text = titulo.trim()
    if (!text) return
    setTitulo('')
    await add(text)
  }

  const done = tasks.filter((t) => t.completada).length

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={submit} style={{ display: 'flex', gap: 8, padding: 12 }}>
          <IonInput
            aria-label="Nueva tarea"
            placeholder="Nueva tarea"
            fill="outline"
            value={titulo}
            onIonInput={(e) => setTitulo(e.detail.value ?? '')}
          />
          <IonButton type="submit" aria-label="Agregar tarea">
            <IonIcon icon={addOutline} />
          </IonButton>
        </form>

        {error && (
          <IonText color="danger">
            <p style={{ padding: '0 16px' }}>{error}</p>
          </IonText>
        )}

        <p style={{ padding: '0 16px', margin: 0 }}>
          <small>
            {tasks.length === 0 ? 'Sin tareas todavia' : `${done} de ${tasks.length} completadas · lista en vivo`}
          </small>
        </p>

        {loading ? (
          <p style={{ padding: 16 }}>Cargando...</p>
        ) : (
          <IonList>
            {tasks.map((t) => (
              <IonItemSliding key={t.id}>
                <IonItem>
                  <IonCheckbox slot="start" checked={t.completada} onIonChange={() => toggle(t)} aria-label={t.titulo} />
                  <IonLabel style={{ textDecoration: t.completada ? 'line-through' : 'none' }}>{t.titulo}</IonLabel>
                  <IonButton slot="end" fill="clear" color="danger" onClick={() => remove(t)} aria-label="Borrar tarea">
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption color="danger" onClick={() => remove(t)}>
                    Borrar
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  )
}
