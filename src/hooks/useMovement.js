import { useCallback, useEffect, useRef, useState } from 'react'
import { Geolocation } from '@capacitor/geolocation'
import { MOVE_METERS, distanceMeters } from '../helpers'

// Sigue el GPS mientras `active` sea true. La posicion original es el primer
// punto con buena precision; al alejarse MOVE_METERS se llama onReached.
export function useMovement(active, onReached) {
  const [meters, setMeters] = useState(0)
  const [error, setError] = useState(null)
  const origin = useRef(null)
  const reached = useRef(false)
  const callback = useRef(onReached)
  callback.current = onReached

  const update = useCallback((m) => {
    setMeters(m)
    if (m >= MOVE_METERS && !reached.current) {
      reached.current = true
      callback.current()
    }
  }, [])

  useEffect(() => {
    if (!active) return
    origin.current = null
    reached.current = false
    setMeters(0)
    setError(null)
    let watchId = null
    let stopped = false

    Geolocation.watchPosition({ enableHighAccuracy: true, timeout: 20000 }, (pos, err) => {
      if (err || !pos) {
        setError('No se pudo leer el GPS. Revisa el permiso de ubicacion.')
        return
      }
      const here = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      if (!origin.current) {
        origin.current = here
        return
      }
      // Ignora lecturas muy imprecisas para no completar por ruido del GPS
      if (pos.coords.accuracy && pos.coords.accuracy > 30) return
      update(distanceMeters(origin.current, here))
    }).then((id) => {
      if (stopped) Geolocation.clearWatch({ id })
      else watchId = id
    })

    return () => {
      stopped = true
      if (watchId) Geolocation.clearWatch({ id: watchId })
    }
  }, [active, update])

  // Para probar en computador (sin GPS): suma metros simulados
  const simulate = () => update(meters + 10)

  return { meters, error, simulate }
}
