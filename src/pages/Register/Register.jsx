import { useState } from 'react'
import { IonButton, IonContent, IonInput, IonPage, IonText } from '@ionic/react'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    try {
      const needsConfirm = await register(email.trim(), password)
      if (needsConfirm) setInfo('Revisa tu correo para confirmar la cuenta y luego inicia sesion.')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Crear cuenta</h1>
        <form onSubmit={submit}>
          <IonInput label="Correo" labelPlacement="floating" fill="outline" type="email" value={email} onIonInput={(e) => setEmail(e.detail.value)} required />
          <br />
          <IonInput label="Contrasena (minimo 6)" labelPlacement="floating" fill="outline" type="password" value={password} onIonInput={(e) => setPassword(e.detail.value)} minlength={6} required />
          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
          {info && (
            <IonText color="success">
              <p>{info}</p>
            </IonText>
          )}
          <IonButton expand="block" type="submit" disabled={busy} className="ion-margin-top">
            Registrarme
          </IonButton>
        </form>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Ya tengo cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
