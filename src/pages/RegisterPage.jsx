import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  IonBackButton,
  IonButton,
  IonButtons,
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

export default function RegisterPage() {
  const { user, loading, register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  if (!loading && user) return <Navigate to="/tasks" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setSending(true)
    const result = await register(email.trim(), password)
    setSending(false)
    setError(result.ok ? '' : result.message)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Crear cuenta</IonTitle>
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
              label="Contraseña (mínimo 6 caracteres)"
              labelPlacement="floating"
              type="password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? '')}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Repite la contraseña"
              labelPlacement="floating"
              type="password"
              value={confirm}
              onIonInput={(e) => setConfirm(e.detail.value ?? '')}
            />
          </IonItem>

          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}

          <IonButton type="submit" expand="block" className="ion-margin-top" disabled={sending}>
            {sending ? 'Creando...' : 'Registrarme'}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}
