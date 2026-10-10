import { useState } from 'react'
import { IonButton, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react'
import SensorPage, { ResultBox } from '../components/SensorPage.jsx'
import useAccelerometer from '../hooks/useAccelerometer.js'

const round = (value) => (typeof value === 'number' ? value.toFixed(2) : value)

function rowsFor(option, data) {
  if (option === 'accel') {
    return [
      ['X', round(data?.acceleration?.x)],
      ['Y', round(data?.acceleration?.y)],
      ['Z', round(data?.acceleration?.z)],
      ['Con gravedad X', round(data?.accelerationIncludingGravity?.x)],
      ['Con gravedad Y', round(data?.accelerationIncludingGravity?.y)],
      ['Con gravedad Z', round(data?.accelerationIncludingGravity?.z)],
    ]
  }
  return [
    ['Alpha (brújula)', round(data?.alpha)],
    ['Beta (adelante/atrás)', round(data?.beta)],
    ['Gamma (izquierda/derecha)', round(data?.gamma)],
  ]
}

export default function AccelerometerPage() {
  const [option, setOption] = useState('accel')
  const { data, active, error, start, stop } = useAccelerometer(option)

  const changeOption = async (value) => {
    if (!value || value === option) return
    await stop()
    setOption(value)
  }

  return (
    <SensorPage title="Acelerómetro" description="Mide cómo se mueve el teléfono." error={error}>
      <IonSegment value={option} onIonChange={(e) => changeOption(e.detail.value)}>
        <IonSegmentButton value="accel">
          <IonLabel>Aceleración</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="orientation">
          <IonLabel>Orientación</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <IonButton expand="block" className="ion-margin-top" onClick={active ? stop : start}>
        {active ? 'Detener' : 'Empezar a medir'}
      </IonButton>

      {data && <ResultBox rows={rowsFor(option, data)} />}
    </SensorPage>
  )
}
