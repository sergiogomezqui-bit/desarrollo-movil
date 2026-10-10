import { useEffect, useRef, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'

// Notificaciones push (llegan desde un servidor, por ejemplo Firebase). Solo funcionan en el teléfono.
export default function usePushNotifications() {
  const supported = Capacitor.isNativePlatform()
  const [token, setToken] = useState('')
  const [received, setReceived] = useState([])
  const [error, setError] = useState('')
  const handles = useRef([])

  const register = async () => {
    if (!supported) return
    try {
      const permission = await PushNotifications.requestPermissions()
      if (permission.receive !== 'granted') {
        setError('Necesitas dar permiso de notificaciones.')
        return
      }
      await PushNotifications.register()
      setError('')
    } catch {
      setError('No se pudo registrar el dispositivo para recibir notificaciones push.')
    }
  }

  useEffect(() => {
    if (!supported) return undefined
    let active = true

    const listeners = [
      PushNotifications.addListener('registration', (result) => setToken(result.value)),
      PushNotifications.addListener('registrationError', () =>
        setError('Falló el registro. Revisa que la app tenga el archivo google-services.json de Firebase.'),
      ),
      PushNotifications.addListener('pushNotificationReceived', (notification) =>
        setReceived((list) => [{ title: notification.title ?? '(sin título)', body: notification.body ?? '' }, ...list]),
      ),
      PushNotifications.addListener('pushNotificationActionPerformed', (action) =>
        setReceived((list) => [
          { title: action.notification.title ?? '(sin título)', body: 'Tocada: ' + (action.notification.body ?? '') },
          ...list,
        ]),
      ),
    ]

    Promise.all(listeners).then((resolved) => {
      if (active) handles.current = resolved
      else resolved.forEach((handle) => handle.remove())
    })

    return () => {
      active = false
      handles.current.forEach((handle) => handle.remove())
      handles.current = []
    }
  }, [supported])

  return { supported, token, received, error, register }
}
