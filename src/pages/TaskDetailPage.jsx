import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useTasks } from '../context/TasksContext.jsx'

export default function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTask, toggleTask, deleteTask } = useTasks()
  const task = getTask(id)

  if (!task) return <Navigate to="/tasks" replace />

  const handleDelete = () => {
    deleteTask(task.id)
    navigate('/tasks', { replace: true })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2 className={task.done ? 'task-done' : ''}>{task.title}</h2>
        <IonBadge color={task.done ? 'success' : 'warning'}>{task.done ? 'Hecha' : 'Pendiente'}</IonBadge>

        <p>{task.description || 'Sin descripción.'}</p>
        <p className="empty-state">Creada el {new Date(task.createdAt).toLocaleDateString('es-CO')}</p>

        <IonButton expand="block" onClick={() => toggleTask(task.id)}>
          {task.done ? 'Marcar como pendiente' : 'Marcar como hecha'}
        </IonButton>
        <IonButton expand="block" fill="outline" routerLink={'/tasks/' + task.id + '/edit'}>
          Editar
        </IonButton>
        <IonButton expand="block" fill="clear" color="danger" onClick={handleDelete}>
          Eliminar
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
