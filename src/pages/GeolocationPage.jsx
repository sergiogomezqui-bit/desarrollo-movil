import { IonButton } from '@ionic/react'
import SensorPage, { ResultBox } from '../components/SensorPage.jsx'
import useGeolocation from '../hooks/useGeolocation.js'

export default function GeolocationPage() {
  const { position, error, watching, getCurrent, startWatching, stopWatching } = useGeolocation()

  return (
    <SensorPage title="Geolocalización" description="Usa el GPS para saber dónde estás." error={error}>
      <IonButton expand="block" onClick={getCurrent}>
        Obtener mi ubicación
      </IonButton>
      <IonButton expand="block" fill="outline" onClick={watching ? stopWatching : startWatching}>
        {watching ? 'Dejar de seguir mi ubicación' : 'Seguir mi ubicación'}
      </IonButton>

      {position && (
        <ResultBox
          rows={[
            ['Latitud', position.latitud],
            ['Longitud', position.longitud],
            ['Precisión (m)', position.precision],
            ['Altitud (m)', position.altitud],
            ['Velocidad (m/s)', position.velocidad],
            ['Hora', position.hora],
          ]}
        />
      )}
    </SensorPage>
  )
}
