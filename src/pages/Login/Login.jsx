import { useState } from 'react'
import { IonButton, IonContent, IonInput, IonPage, IonText } from '@ionic/react'
import { useAuth } from '../../context/AuthContext'
import { authMessage } from '../../helpers'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email.trim(), password)
    } catch (err) {
      setError(authMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Misiones</h1>
        <p>Inicia sesion para ver tus misiones.</p>
        <form onSubmit={submit}>
          <IonInput label="Correo" labelPlacement="floating" fill="outline" type="email" value={email} onIonInput={(e) => setEmail(e.detail.value)} required />
          <br />
          <IonInput label="Contrasena" labelPlacement="floating" fill="outline" type="password" value={password} onIonInput={(e) => setPassword(e.detail.value)} required />
          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
          <IonButton expand="block" type="submit" disabled={busy} className="ion-margin-top">
            Entrar
          </IonButton>
        </form>
        <IonButton expand="block" fill="clear" routerLink="/register">
          Crear cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
