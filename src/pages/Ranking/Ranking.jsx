import { IonBadge, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react'
import { useAuth } from '../../context/AuthContext'
import { useMissions } from '../../context/MissionsContext'
import { useRanking } from '../../hooks/useRanking'

export default function Ranking() {
  const { user } = useAuth()
  const { progress } = useMissions()
  const { list, error } = useRanking(user.uid, user.name, progress.points)
  const me = list.find((i) => i.me)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ranking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p style={{ padding: '8px 16px' }}>
          Vas en el puesto <strong>{me.rank}</strong> de {list.length}.
        </p>
        {error && (
          <IonText color="danger">
            <p style={{ padding: '0 16px' }}>No se pudo leer el ranking de Firebase; se muestran rivales de ejemplo.</p>
          </IonText>
        )}
        <IonList>
          {list.map((item) => (
            <IonItem key={item.id} color={item.me ? 'light' : undefined}>
              <IonBadge slot="start" color={item.rank === 1 ? 'warning' : 'medium'}>
                {item.rank}
              </IonBadge>
              <IonLabel>
                {item.me ? `${item.name} (tu)` : item.name}
                {item.demo && <small> · ejemplo</small>}
              </IonLabel>
              <strong>{item.points} pts</strong>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
