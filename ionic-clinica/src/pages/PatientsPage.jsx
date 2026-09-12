import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react'
import { useClinicData } from '../context/ClinicDataContext'

export default function PatientsPage() {
  const { patients } = useClinicData()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {patients.map((patient) => (
            <IonItem key={patient.id}>
              <IonLabel>
                <h2>
                  {patient.firstName} {patient.lastName}
                </h2>
                <p>CC: {patient.cc}</p>
                <p>Tel: {patient.phone}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
