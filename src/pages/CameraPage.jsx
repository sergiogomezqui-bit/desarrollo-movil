import { IonButton } from '@ionic/react'
import SensorPage from '../components/SensorPage.jsx'
import useCamera from '../hooks/useCamera.js'

export default function CameraPage() {
  const { photo, error, takePhoto, pickFromGallery, clearPhoto } = useCamera()

  return (
    <SensorPage title="Cámara" description="Toma una foto o elige una que ya tengas." error={error}>
      <IonButton expand="block" onClick={takePhoto}>
        Tomar foto
      </IonButton>
      <IonButton expand="block" fill="outline" onClick={pickFromGallery}>
        Elegir de la galería
      </IonButton>

      {photo && (
        <>
          <img className="photo-preview" src={photo} alt="Foto seleccionada" />
          <IonButton expand="block" fill="clear" color="danger" onClick={clearPhoto}>
            Quitar foto
          </IonButton>
        </>
      )}
    </SensorPage>
  )
}
