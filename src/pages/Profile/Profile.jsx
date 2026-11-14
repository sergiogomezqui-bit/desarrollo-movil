import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react'
import { cameraOutline, personCircleOutline } from 'ionicons/icons'
import { useAuth } from '../../context/AuthContext'
import { useAvatar } from '../../hooks/useAvatar'

export default function Profile() {
  const { user, logout } = useAuth()
  const { url, busy, error, takePhoto } = useAvatar(user.id)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <IonAvatar style={{ width: 140, height: 140 }}>
            {url ? (
              <img src={url} alt="Foto de perfil" style={{ objectFit: 'cover' }} />
            ) : (
              <IonIcon icon={personCircleOutline} style={{ width: '100%', height: '100%' }} />
            )}
          </IonAvatar>
          <strong>{user.email}</strong>
          <IonButton onClick={takePhoto} disabled={busy}>
            <IonIcon slot="start" icon={cameraOutline} />
            {busy ? 'Subiendo...' : 'Tomar foto de perfil'}
          </IonButton>
          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
        </div>
        <IonButton expand="block" fill="outline" color="danger" className="ion-margin-top" onClick={logout}>
          Cerrar sesion
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
