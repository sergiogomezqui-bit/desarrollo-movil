import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { add, trashOutline } from 'ionicons/icons'
import { useAuth } from '../context/AuthContext.jsx'
import { useTasks } from '../context/TasksContext.jsx'

export default function TasksListPage() {
  const { user, logout } = useAuth()
  const { tasks, toggleTask, deleteTask } = useTasks()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>Salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p className="ion-padding-horizontal ion-padding-top empty-state">{user?.email}</p>

        {tasks.length === 0 ? (
          <p className="ion-padding empty-state">Todavía no tienes tareas. Agrega la primera con el botón +.</p>
        ) : (
          <IonList>
            {tasks.map((task) => (
              <IonItem key={task.id}>
                <IonCheckbox
                  slot="start"
                  checked={task.done}
                  onIonChange={() => toggleTask(task.id)}
                  aria-label={'Marcar ' + task.title}
                />
                <IonLabel routerLink={'/tasks/' + task.id} className={task.done ? 'task-done' : ''}>
                  {task.title}
                </IonLabel>
                <IonButton
                  slot="end"
                  fill="clear"
                  color="danger"
                  onClick={() => deleteTask(task.id)}
                  aria-label={'Eliminar ' + task.title}
                >
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/tasks/new" aria-label="Agregar tarea">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}
