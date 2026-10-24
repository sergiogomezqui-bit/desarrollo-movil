import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ProgressSummary from '../../components/Shared/ProgressSummary'
import { useAuth } from '../../context/AuthContext'
import { useMissions } from '../../context/MissionsContext'
import { MISSIONS, TOTAL_POINTS, completedCount } from '../../helpers'

export default function Results() {
  const { user, logout } = useAuth()
  const { progress, reset } = useMissions()
  const done = completedCount(progress)
  const status =
    done === MISSIONS.length ? 'Completado' : done === 0 ? 'Sin iniciar' : `En progreso (faltan ${MISSIONS.length - done})`

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProgressSummary progress={progress} />
        <IonList>
          <IonItem>
            <IonLabel>Jugador</IonLabel>
            <span>{user.name}</span>
          </IonItem>
          <IonItem>
            <IonLabel>Puntos totales</IonLabel>
            <span>
              {progress.points} / {TOTAL_POINTS}
            </span>
          </IonItem>
          <IonItem>
            <IonLabel>Misiones completadas</IonLabel>
            <span>
              {done} / {MISSIONS.length}
            </span>
          </IonItem>
          <IonItem>
            <IonLabel>Estado general</IonLabel>
            <strong>{status}</strong>
          </IonItem>
        </IonList>
        <div style={{ padding: 16 }}>
          <IonButton expand="block" color="medium" onClick={reset}>
            Reiniciar misiones
          </IonButton>
          <IonButton expand="block" fill="outline" color="danger" onClick={logout}>
            Cerrar sesion
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}
