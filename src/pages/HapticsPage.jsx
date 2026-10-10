import { IonButton, IonText } from '@ionic/react'
import SensorPage from '../components/SensorPage.jsx'
import useHaptics from '../hooks/useHaptics.js'

export default function HapticsPage() {
  const { supported, vibrate, impact, notification, selection, ImpactStyle, NotificationType } = useHaptics()

  return (
    <SensorPage title="Vibración (Haptics)" description="Hace vibrar el teléfono de distintas formas.">
      {!supported && (
        <IonText color="warning">
          <p className="unsupported-note">Este dispositivo no tiene vibración, así que los botones no harán nada.</p>
        </IonText>
      )}

      <IonButton expand="block" onClick={() => vibrate(500)}>
        Vibrar medio segundo
      </IonButton>
      <IonButton expand="block" fill="outline" onClick={() => impact(ImpactStyle.Light)}>
        Golpe suave
      </IonButton>
      <IonButton expand="block" fill="outline" onClick={() => impact(ImpactStyle.Medium)}>
        Golpe medio
      </IonButton>
      <IonButton expand="block" fill="outline" onClick={() => impact(ImpactStyle.Heavy)}>
        Golpe fuerte
      </IonButton>
      <IonButton expand="block" fill="outline" color="success" onClick={() => notification(NotificationType.Success)}>
        Aviso de éxito
      </IonButton>
      <IonButton expand="block" fill="outline" color="warning" onClick={() => notification(NotificationType.Warning)}>
        Aviso de advertencia
      </IonButton>
      <IonButton expand="block" fill="outline" color="danger" onClick={() => notification(NotificationType.Error)}>
        Aviso de error
      </IonButton>
      <IonButton expand="block" fill="clear" onClick={selection}>
        Selección
      </IonButton>
    </SensorPage>
  )
}
