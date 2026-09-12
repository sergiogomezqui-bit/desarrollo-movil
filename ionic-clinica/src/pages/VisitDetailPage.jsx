import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonCard,
  IonCardContent,
  IonBadge,
  IonButton,
  IonIcon,
  IonText,
} from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import { useClinicData, STATUS_LABELS, STATUS_FLOW } from '../context/ClinicDataContext'

const STATUS_COLOR = {
  pendiente: 'medium',
  en_camino: 'warning',
  finalizada: 'success',
}

export default function VisitDetailPage({ visitId, onBack }) {
  const { visits, advanceVisitStatus } = useClinicData()
  const visit = visits.find((v) => v.id === visitId)

  if (!visit) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onBack}>
                <IonIcon slot="icon-only" icon={arrowBackOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle>Visita no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    )
  }

  const isFinal = visit.status === 'finalizada'
  const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(visit.status) + 1]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onBack}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Detalle de visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <h2>{visit.patientName}</h2>
            <p>Hora de la visita: {visit.time}</p>
            <p>
              Estado actual:{' '}
              <IonBadge color={STATUS_COLOR[visit.status]}>
                {STATUS_LABELS[visit.status]}
              </IonBadge>
            </p>

            {!isFinal ? (
              <IonButton expand="block" onClick={() => advanceVisitStatus(visit.id)}>
                Marcar como {STATUS_LABELS[nextStatus]}
              </IonButton>
            ) : (
              <IonText color="success">
                <p>Esta visita ya fue finalizada.</p>
              </IonText>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}
