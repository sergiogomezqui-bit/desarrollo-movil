import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/react'
import { logOutOutline } from 'ionicons/icons'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <h2>{user.name}</h2>
            <p>Especialidad: {user.specialty}</p>
            <p>Usuario: {user.username}</p>

            <IonButton expand="block" color="danger" onClick={logout}>
              <IonIcon slot="start" icon={logOutOutline} />
              Cerrar sesión
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}
