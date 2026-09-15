import { IonList } from '@ionic/react'
import TaskItem from './TaskItem.jsx'

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="ion-padding empty-state">No hay tareas todavia. Agrega la primera arriba.</p>
  }

  return (
    <IonList>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </IonList>
  )
}
