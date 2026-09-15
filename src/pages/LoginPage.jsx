import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const { logged, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (logged) {
    return <Navigate to="/list" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = login(email, password)
    if (!ok) {
      setError('Correo o contrasena incorrectos.')
      return
    }
    setError('')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonInput
              label="Email"
              labelPlacement="floating"
              type="email"
              placeholder="user@mail.com"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value ?? '')}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Password"
              labelPlacement="floating"
              type="password"
              placeholder="123"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? '')}
            />
          </IonItem>

          {error && (
            <IonText color="danger">
              <p className="ion-padding-top">{error}</p>
            </IonText>
          )}

          <IonButton type="submit" expand="block" className="ion-margin-top">
            Login
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}
