import { useState } from 'react'
import { IonButton, IonInput, IonItem, IonList, IonLabel, IonText } from '@ionic/react'
import SensorPage from '../components/SensorPage.jsx'
import useLocalNotifications from '../hooks/useLocalNotifications.js'

const PERMISSION_TEXT = {
  granted: 'Permiso dado',
  denied: 'Permiso denegado',
  prompt: 'Aún no has dado permiso',
  'prompt-with-rationale': 'Aún no has dado permiso',
}

export default function LocalNotificationsPage() {
  const { pending, permission, lastReceived, error, requestPermission, schedule, cancelAll } = useLocalNotifications()
  const [title, setTitle] = useState('Hola')
  const [body, setBody] = useState('Esta es una notificación local')
  const [seconds, setSeconds] = useState('5')
  const [sent, setSent] = useState(false)

  const handleSchedule = async (e) => {
    e.preventDefault()
    const wait = Math.max(1, Number(seconds) || 5)
    const ok = await schedule({ title: title.trim() || 'Aviso', body: body.trim(), seconds: wait })
    setSent(ok)
  }

  return (
    <SensorPage
      title="Notificaciones locales"
      description="El teléfono se manda un aviso a sí mismo, sin servidor."
      error={error}
    >
      <p className="hint">{PERMISSION_TEXT[permission] ?? permission}</p>
      <IonButton expand="block" fill="outline" onClick={requestPermission}>
        Pedir permiso
      </IonButton>

      <form onSubmit={handleSchedule} className="ion-margin-top">
        <IonItem>
          <IonInput label="Título" labelPlacement="floating" value={title} onIonInput={(e) => setTitle(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonInput label="Mensaje" labelPlacement="floating" value={body} onIonInput={(e) => setBody(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonInput
            label="Avisar en (segundos)"
            labelPlacement="floating"
            type="number"
            value={seconds}
            onIonInput={(e) => setSeconds(e.detail.value ?? '')}
          />
        </IonItem>
        <IonButton type="submit" expand="block" className="ion-margin-top">
          Programar notificación
        </IonButton>
      </form>

      {sent && (
        <IonText color="success">
          <p>Notificación programada.</p>
        </IonText>
      )}
      {lastReceived && <p className="hint">Última recibida: {lastReceived}</p>}

      <h3>Pendientes ({pending.length})</h3>
      {pending.length === 0 ? (
        <p className="hint">No hay notificaciones pendientes.</p>
      ) : (
        <IonList>
          {pending.map((item) => (
            <IonItem key={item.id}>
              <IonLabel>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}
      {pending.length > 0 && (
        <IonButton expand="block" fill="clear" color="danger" onClick={cancelAll}>
          Cancelar todas
        </IonButton>
      )}
    </SensorPage>
  )
}
