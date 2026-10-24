import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import styles from './MissionCard.module.scss'

export default function MissionCard({ mission, completed, locked, children }) {
  return (
    <IonCard className={`${styles.card} ${locked ? styles.locked : ''}`}>
      <IonCardHeader>
        <div className={styles.row}>
          <IonCardTitle>
            {mission.id}. {mission.title}
          </IonCardTitle>
          <IonBadge color={completed ? 'success' : locked ? 'medium' : 'warning'}>
            {completed ? 'Completada' : locked ? 'Bloqueada' : 'Pendiente'}
          </IonBadge>
        </div>
        <IonCardSubtitle>+{mission.points} puntos</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{mission.description}</p>
        {!completed && !locked && children}
      </IonCardContent>
    </IonCard>
  )
}
