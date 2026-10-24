import { useState } from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { IonButton, IonContent, IonHeader, IonPage, IonProgressBar, IonText, IonTitle, IonToolbar } from '@ionic/react'
import MissionCard from '../../components/Index/MissionCard'
import ProgressSummary from '../../components/Shared/ProgressSummary'
import { useMissions } from '../../context/MissionsContext'
import { MISSIONS, MOVE_METERS, STILL_SECONDS, isCompleted, isUnlocked } from '../../helpers'
import { useMovement } from '../../hooks/useMovement'
import { useStillness } from '../../hooks/useStillness'
import styles from '../../components/Index/MissionCard.module.scss'

const SYNC_TEXT = {
  local: 'Guardado en el dispositivo',
  syncing: 'Sincronizando con Firebase...',
  synced: 'Guardado en Firebase y en el dispositivo',
  error: 'Solo guardado local (sin conexion con Firebase)',
}

export default function Home() {
  const { progress, photo, sync, complete, savePhoto } = useMissions()
  const [trackingMove, setTrackingMove] = useState(false)
  const [waitingStill, setWaitingStill] = useState(false)
  const [cameraError, setCameraError] = useState(null)

  const done2 = isCompleted(progress, 2)
  const done3 = isCompleted(progress, 3)

  const movement = useMovement(trackingMove && !done2, () => {
    setTrackingMove(false)
    complete(2)
  })
  const still = useStillness(waitingStill && !done3, () => {
    setWaitingStill(false)
    complete(3)
  })

  const takePhoto = async () => {
    setCameraError(null)
    try {
      const img = await Camera.getPhoto({
        quality: 60,
        width: 640,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        saveToGallery: true,
      })
      // La mision se completa al guardar la imagen
      savePhoto(img.dataUrl)
      complete(1)
    } catch (err) {
      if (!/cancel/i.test(err?.message || '')) setCameraError('No se pudo usar la camara')
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Misiones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProgressSummary progress={progress} />
        <div style={{ padding: '0 16px' }}>
          <small>{SYNC_TEXT[sync]}</small>

          {MISSIONS.map((m) => (
            <MissionCard key={m.id} mission={m} completed={isCompleted(progress, m.id)} locked={!isUnlocked(progress, m.id)}>
              {m.id === 1 && (
                <IonButton expand="block" onClick={takePhoto}>
                  Tomar foto
                </IonButton>
              )}
              {m.id === 2 &&
                (trackingMove ? (
                  <>
                    <IonProgressBar value={Math.min(movement.meters / MOVE_METERS, 1)} />
                    <p>
                      {movement.meters.toFixed(1)} / {MOVE_METERS} m
                    </p>
                    {movement.error && <IonText color="danger">{movement.error}</IonText>}
                    <IonButton size="small" fill="outline" onClick={movement.simulate}>
                      Simular +10 m (pruebas en PC)
                    </IonButton>
                  </>
                ) : (
                  <IonButton expand="block" onClick={() => setTrackingMove(true)}>
                    Empezar a moverme
                  </IonButton>
                ))}
              {m.id === 3 &&
                (waitingStill ? (
                  <>
                    <IonProgressBar value={still.seconds / STILL_SECONDS} color={still.moving ? 'danger' : 'primary'} />
                    <p>
                      {still.moving ? 'Te moviste, se reinicia la cuenta' : `Quieto ${still.seconds} / ${STILL_SECONDS} s`}
                    </p>
                  </>
                ) : (
                  <IonButton expand="block" onClick={() => setWaitingStill(true)}>
                    Quedarme quieto
                  </IonButton>
                ))}
            </MissionCard>
          ))}

          {cameraError && <IonText color="danger">{cameraError}</IonText>}
          {photo && <img className={styles.photo} src={photo} alt="Evidencia" />}
        </div>
      </IonContent>
    </IonPage>
  )
}
