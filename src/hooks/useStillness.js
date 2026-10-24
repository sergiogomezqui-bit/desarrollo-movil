import { useEffect, useRef, useState } from 'react'
import { Motion } from '@capacitor/motion'
import { Haptics } from '@capacitor/haptics'
import { STILL_SECONDS } from '../helpers'

// Umbral (m/s2) de cambio de aceleracion que se considera "movimiento"
const MOVE_THRESHOLD = 0.6

// Con el acelerometro mide cuanto tiempo seguido esta quieto el celular.
// Al llegar a STILL_SECONDS vibra y llama onDone. Moverse reinicia la cuenta.
export function useStillness(active, onDone) {
  const [seconds, setSeconds] = useState(0)
  const [moving, setMoving] = useState(false)
  const last = useRef(null)
  const stillSince = useRef(Date.now())
  const done = useRef(false)
  const callback = useRef(onDone)
  callback.current = onDone

  useEffect(() => {
    if (!active) return
    done.current = false
    stillSince.current = Date.now()
    last.current = null
    setSeconds(0)

    let handle = null
    let stopped = false

    Motion.addListener('accel', (e) => {
      const a = e.accelerationIncludingGravity || e.acceleration
      if (!a) return
      const mag = Math.sqrt((a.x || 0) ** 2 + (a.y || 0) ** 2 + (a.z || 0) ** 2)
      if (last.current !== null && Math.abs(mag - last.current) > MOVE_THRESHOLD) {
        stillSince.current = Date.now()
        setMoving(true)
      }
      last.current = mag
    })
      .then((h) => {
        if (stopped) h.remove()
        else handle = h
      })
      .catch(() => {})

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - stillSince.current) / 1000)
      setSeconds(Math.min(elapsed, STILL_SECONDS))
      if (elapsed < 1) return
      setMoving(false)
      if (elapsed >= STILL_SECONDS && !done.current) {
        done.current = true
        // Vibra sin bloquear la pantalla; en navegador usa la API de vibracion
        Haptics.vibrate({ duration: 800 }).catch(() => navigator.vibrate?.(800))
        callback.current()
      }
    }, 250)

    return () => {
      stopped = true
      clearInterval(timer)
      handle?.remove()
    }
  }, [active])

  return { seconds, moving }
}
