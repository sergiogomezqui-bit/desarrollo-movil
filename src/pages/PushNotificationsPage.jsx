import { IonButton, IonItem, IonLabel, IonList, IonText } from '@ionic/react'
import SensorPage from '../components/SensorPage.jsx'
import usePushNotifications from '../hooks/usePushNotifications.js'

export default function PushNotificationsPage() {
  const { supported, token, received, error, register } = usePushNotifications()

  return (
    <SensorPage
      title="Notificaciones push"
      description="Avisos que llegan desde un servidor, como Firebase."
      error={error}
    >
      {!supported && (
        <IonText color="warning">
          <p className="unsupported-note">
            Las notificaciones push solo funcionan en la app instalada en el teléfono (Android o iOS), no en el navegador.
          </p>
        </IonText>
      )}

      <IonButton expand="block" disabled={!supported} onClick={register}>
        Registrar este teléfono
      </IonButton>

      {token && (
        <div className="result-box">
          <strong>Token del teléfono:</strong>
          {'\n'}
          {token}
        </div>
      )}

      <h3>Recibidas ({received.length})</h3>
      {received.length === 0 ? (
        <p className="hint">Todavía no ha llegado ninguna notificación.</p>
      ) : (
        <IonList>
          {received.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}
    </SensorPage>
  )
}
