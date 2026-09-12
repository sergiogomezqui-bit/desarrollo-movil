import { useState } from 'react'
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonText,
} from '@ionic/react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  function handleLogin() {
    const result = login(username.trim(), password)
    if (!result.ok) {
      setToastMessage(result.error)
      setShowToast(true)
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding login-content">
        <IonCard className="login-card">
          <IonCardContent>
            <h1 className="login-title">MediClinic</h1>
            <IonText color="medium">
              <p>Consulta de visitas médicas</p>
            </IonText>

            <IonItem>
              <IonLabel position="stacked">Usuario</IonLabel>
              <IonInput
                value={username}
                placeholder="dr.rios"
                onIonInput={(e) => setUsername(e.detail.value)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Contraseña</IonLabel>
              <IonInput
                type="password"
                value={password}
                placeholder="••••••••"
                onIonInput={(e) => setPassword(e.detail.value)}
              />
            </IonItem>

            <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
              Ingresar
            </IonButton>

            <IonText color="medium">
              <p className="login-hint">
                Médicos de prueba: <code>dr.rios / rios123</code> o{' '}
                <code>dr.mora / mora123</code>
              </p>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2500}
          color="danger"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  )
}
