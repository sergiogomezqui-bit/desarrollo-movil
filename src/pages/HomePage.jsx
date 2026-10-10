import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import {
  cameraOutline,
  cloudUploadOutline,
  folderOpenOutline,
  locationOutline,
  notificationsOutline,
  phonePortraitOutline,
  pulseOutline,
  speedometerOutline,
} from 'ionicons/icons'

const SENSORS = [
  { to: '/geolocation', label: 'Geolocalización', icon: locationOutline },
  { to: '/camera', label: 'Cámara', icon: cameraOutline },
  { to: '/accelerometer', label: 'Acelerómetro', icon: speedometerOutline },
  { to: '/device', label: 'Dispositivo', icon: phonePortraitOutline },
  { to: '/haptics', label: 'Vibración (Haptics)', icon: pulseOutline },
  { to: '/filesystem', label: 'Archivos (Filesystem)', icon: folderOpenOutline },
  { to: '/local-notifications', label: 'Notificaciones locales', icon: notificationsOutline },
  { to: '/push-notifications', label: 'Notificaciones push', icon: cloudUploadOutline },
]

export default function HomePage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sensores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p className="hint">Elige un sensor para probarlo.</p>
        {SENSORS.map((sensor) => (
          <IonButton key={sensor.to} routerLink={sensor.to} expand="block" className="ion-margin-bottom">
            <IonIcon slot="start" icon={sensor.icon} />
            {sensor.label}
          </IonButton>
        ))}
      </IonContent>
    </IonPage>
  )
}
