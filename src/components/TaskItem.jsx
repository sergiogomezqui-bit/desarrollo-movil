import { IonBadge, IonButton, IonCheckbox, IonItem, IonLabel } from '@ionic/react'

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <IonItem>
      <IonCheckbox
        slot="start"
        checked={task.done}
        onIonChange={() => onToggle(task.id)}
        aria-label={`Marcar "${task.title}" como completada`}
      />
      <IonLabel className={task.done ? 'task-done' : ''}>{task.title}</IonLabel>
      {task.done && <IonBadge color="success">Hecha</IonBadge>}
      <IonButton
        slot="end"
        fill="clear"
        color="danger"
        onClick={() => onDelete(task.id)}
        aria-label={`Eliminar "${task.title}"`}
      >
        Eliminar
      </IonButton>
    </IonItem>
  )
}
