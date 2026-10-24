import { useState } from 'react'
import { IonButton, IonContent, IonInput, IonPage, IonText } from '@ionic/react'
import { useAuth } from '../../context/AuthContext'
import { authMessage } from '../../helpers'

export default function Register() {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (field) => (e) => setForm((cur) => ({ ...cur, [field]: e.detail.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Escribe tu nombre')
    setBusy(true)
    try {
      await register({ ...form, name: form.name.trim(), email: form.email.trim() })
    } catch (err) {
      setError(authMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Crear cuenta</h1>
        <form onSubmit={submit}>
          <IonInput label="Nombre" labelPlacement="floating" fill="outline" value={form.name} onIonInput={set('name')} required />
          <br />
          <IonInput label="Correo" labelPlacement="floating" fill="outline" type="email" value={form.email} onIonInput={set('email')} required />
          <br />
          <IonInput label="Contrasena" labelPlacement="floating" fill="outline" type="password" value={form.password} onIonInput={set('password')} required />
          {error && (
            <IonText color="danger">
              <p>{error}</p>
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
