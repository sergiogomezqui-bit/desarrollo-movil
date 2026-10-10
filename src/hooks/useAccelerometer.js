import { useCallback, useEffect, useRef, useState } from 'react'
import { Motion } from '@capacitor/motion'

// Movimientos del teléfono. option: "accel" (aceleración) u "orientation" (inclinación/brújula).
export default function useAccelerometer(option = 'accel') {
  const [data, setData] = useState(null)
  const [active, setActive] = useState(false)
  const [error, setError] = useState('')
  const handle = useRef(null)

  const stop = useCallback(async () => {
    if (handle.current) {
      await handle.current.remove()
      handle.current = null
    }
    setActive(false)
  }, [])

  const start = useCallback(async () => {
    try {
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        const answer = await DeviceMotionEvent.requestPermission()
        if (answer !== 'granted') {
          setError('No diste permiso para usar los sensores de movimiento.')
          return
        }
      }
      handle.current = await Motion.addListener(option, (event) => setData(event))
      setActive(true)
      setError('')
    } catch {
      setError('Este dispositivo no permite leer los sensores de movimiento.')
    }
  }, [option])

  useEffect(() => {
    return () => {
      if (handle.current) handle.current.remove()
    }
  }, [])

  return { data, active, error, start, stop }
}
