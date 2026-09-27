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
  const { user, loading, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  if (!loading && user) return <Navigate to="/contacts" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const result = await login(email.trim(), password)
    setSending(false)
    setError(result.ok ? '' : result.message)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form className="auth-card" onSubmit={handleSubmit}>
          <IonItem>
            <IonInput
              label="Correo"
              labelPlacement="floating"
              type="email"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value ?? '')}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Contraseña"
              labelPlacement="floating"
              type="password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? '')}
            />
          </IonItem>

          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}

          <IonButton type="submit" expand="block" className="ion-margin-top" disabled={sending}>
            {sending ? 'Entrando...' : 'Entrar'}
          </IonButton>
          <IonButton routerLink="/register" fill="clear" expand="block">
            No tengo cuenta, registrarme
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}
