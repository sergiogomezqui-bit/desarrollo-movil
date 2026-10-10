import { IonButton } from '@ionic/react'
import SensorPage, { ResultBox } from '../components/SensorPage.jsx'
import useDevice from '../hooks/useDevice.js'

export default function DevicePage() {
  const { info, battery, language, deviceId, error, refresh } = useDevice()

  const batteryLevel = typeof battery?.batteryLevel === 'number' ? Math.round(battery.batteryLevel * 100) + '%' : null
  const charging = typeof battery?.isCharging === 'boolean' ? (battery.isCharging ? 'Sí' : 'No') : null

  return (
    <SensorPage title="Dispositivo" description="Datos del teléfono que estás usando." error={error}>
      <IonButton expand="block" onClick={refresh}>
        Actualizar
      </IonButton>

      {info && (
        <ResultBox
          rows={[
            ['Modelo', info.model],
            ['Fabricante', info.manufacturer],
            ['Plataforma', info.platform],
            ['Sistema operativo', info.operatingSystem + ' ' + info.osVersion],
            ['Es máquina virtual', info.isVirtual ? 'Sí' : 'No'],
            ['Batería', batteryLevel],
            ['Cargando', charging],
            ['Idioma', language],
            ['Identificador', deviceId],
          ]}
        />
      )}
    </SensorPage>
  )
}
