import { useCallback, useEffect, useRef, useState } from 'react'
import { Geolocation } from '@capacitor/geolocation'

function toPosition(position) {
  return {
    latitud: position.coords.latitude,
    longitud: position.coords.longitude,
    precision: position.coords.accuracy,
    altitud: position.coords.altitude,
    velocidad: position.coords.speed,
    hora: new Date(position.timestamp).toLocaleTimeString('es-CO'),
  }
}

// Ubicación del teléfono con GPS: una vez (getCurrentPosition) o siguiendo el movimiento (watchPosition).
export default function useGeolocation() {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState('')
  const [watching, setWatching] = useState(false)
  const watchId = useRef(null)

  const getCurrent = useCallback(async () => {
    try {
      await Geolocation.requestPermissions()
      const result = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      setPosition(toPosition(result))
      setError('')
    } catch {
      setError('No se pudo obtener la ubicación. Revisa que el permiso y el GPS estén activos.')
    }
  }, [])

  const stopWatching = useCallback(async () => {
    if (watchId.current !== null) {
      await Geolocation.clearWatch({ id: watchId.current })
      watchId.current = null
    }
    setWatching(false)
  }, [])

  const startWatching = useCallback(async () => {
    try {
      await Geolocation.requestPermissions()
      watchId.current = await Geolocation.watchPosition({ enableHighAccuracy: true }, (result, err) => {
        if (err || !result) {
          setError('Se perdió la señal de ubicación.')
          return
        }
        setPosition(toPosition(result))
        setError('')
      })
      setWatching(true)
    } catch {
      setError('No se pudo seguir la ubicación. Revisa el permiso y el GPS.')
    }
  }, [])

  useEffect(() => {
    return () => {
      if (watchId.current !== null) Geolocation.clearWatch({ id: watchId.current })
    }
  }, [])

  return { position, error, watching, getCurrent, startWatching, stopWatching }
}
