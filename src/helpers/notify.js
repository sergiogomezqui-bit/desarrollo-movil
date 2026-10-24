import { LocalNotifications } from '@capacitor/local-notifications'

let nextId = 1

export async function notify(title, body) {
  try {
    const perm = await LocalNotifications.checkPermissions()
    if (perm.display !== 'granted') {
      const asked = await LocalNotifications.requestPermissions()
      if (asked.display !== 'granted') return
    }
    await LocalNotifications.schedule({
      notifications: [{ id: nextId++, title, body, schedule: { at: new Date(Date.now() + 300) } }],
    })
  } catch (err) {
    console.warn('Notificacion no disponible:', err)
  }
}
