import { useState } from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/react'
import { useClinicData, STATUS_LABELS } from '../context/ClinicDataContext'
import VisitDetailPage from './VisitDetailPage'

const STATUS_COLOR = {
  pendiente: 'medium',
  en_camino: 'warning',
  finalizada: 'success',
}

export default function VisitsPage() {
  const { visits } = useClinicData()
  const [selectedVisitId, setSelectedVisitId] = useState(null)

  if (selectedVisitId) {
    return (
      <VisitDetailPage
        visitId={selectedVisitId}
        onBack={() => setSelectedVisitId(null)}
      />
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas de hoy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {visits.map((visit) => (
            <IonItem key={visit.id} button onClick={() => setSelectedVisitId(visit.id)}>
              <IonLabel>
                <h2>{visit.patientName}</h2>
                <p>Hora: {visit.time}</p>
              </IonLabel>
              <IonBadge color={STATUS_COLOR[visit.status]}>
                {STATUS_LABELS[visit.status]}
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
