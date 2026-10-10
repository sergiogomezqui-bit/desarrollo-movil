import { useCallback, useEffect, useState } from 'react'
import { Device } from '@capacitor/device'

// Información del teléfono: modelo, sistema, batería, idioma e identificador.
export default function useDevice() {
  const [info, setInfo] = useState(null)
  const [battery, setBattery] = useState(null)
  const [language, setLanguage] = useState('')
  const [deviceId, setDeviceId] = useState('')
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    try {
      const [deviceInfo, batteryInfo, lang, id] = await Promise.all([
        Device.getInfo(),
        Device.getBatteryInfo(),
        Device.getLanguageCode(),
        Device.getId(),
      ])
      setInfo(deviceInfo)
      setBattery(batteryInfo)
      setLanguage(lang.value)
      setDeviceId(id.identifier)
      setError('')
    } catch {
      setError('No se pudo leer la información del dispositivo.')
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { info, battery, language, deviceId, error, refresh }
}
