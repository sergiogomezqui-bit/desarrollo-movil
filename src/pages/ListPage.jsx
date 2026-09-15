import { Navigate } from 'react-router-dom'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useAuth } from '../context/AuthContext.jsx'

const DEMO_ITEMS = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

export default function ListPage() {
  const { logged, logout } = useAuth()

  if (!logged) {
    return <Navigate to="/login" replace />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista</IonTitle>
          <IonButton slot="end" fill="clear" onClick={logout}>
            Logout
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {DEMO_ITEMS.map((item) => (
            <IonItem key={item}>
              <IonLabel>{item}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
