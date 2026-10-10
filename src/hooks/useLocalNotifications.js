import { useCallback, useEffect, useState } from 'react'
import { LocalNotifications } from '@capacitor/local-notifications'

// Notificaciones locales: se programan en el propio teléfono, sin servidor.
export default function useLocalNotifications() {
  const [pending, setPending] = useState([])
  const [permission, setPermission] = useState('prompt')
  const [lastReceived, setLastReceived] = useState('')
  const [error, setError] = useState('')

  const refreshPending = useCallback(async () => {
    try {
      const result = await LocalNotifications.getPending()
      setPending(result.notifications)
    } catch {
      setPending([])
    }
  }, [])

  const requestPermission = useCallback(async () => {
    try {
      const result = await LocalNotifications.requestPermissions()
      setPermission(result.display)
      return result.display === 'granted'
    } catch {
      setError('Este dispositivo no permite notificaciones locales.')
      return false
    }
  }, [])

  const schedule = async ({ title, body, seconds }) => {
    const allowed = await requestPermission()
    if (!allowed) {
      setError('Necesitas dar permiso de notificaciones.')
      return false
    }
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Date.now() % 2147483647),
            title,
            body,
            schedule: { at: new Date(Date.now() + seconds * 1000) },
          },
        ],
      })
      setError('')
      await refreshPending()
      return true
    } catch {
      setError('No se pudo programar la notificación.')
      return false
    }
  }

  const cancelAll = async () => {
    try {
      const result = await LocalNotifications.getPending()
      if (result.notifications.length > 0) {
        await LocalNotifications.cancel({ notifications: result.notifications })
      }
      await refreshPending()
    } catch {
      setError('No se pudieron cancelar las notificaciones.')
    }
  }

  useEffect(() => {
    let received = null
    LocalNotifications.checkPermissions()
      .then((result) => setPermission(result.display))
      .catch(() => {})
    LocalNotifications.addListener('localNotificationReceived', (notification) => {
      setLastReceived(notification.title ?? '')
      refreshPending()
    })
      .then((handle) => {
        received = handle
      })
      .catch(() => {})
    refreshPending()
    return () => {
      received?.remove()
    }
  }, [refreshPending])

  return { pending, permission, lastReceived, error, requestPermission, schedule, cancelAll }
}
