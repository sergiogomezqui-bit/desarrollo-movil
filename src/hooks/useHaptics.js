import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'

// Vibración del teléfono. Si el dispositivo no tiene vibrador, las llamadas no hacen nada.
export default function useHaptics() {
  const supported = Capacitor.isNativePlatform() || (typeof navigator !== 'undefined' && 'vibrate' in navigator)

  const vibrate = (duration = 500) => Haptics.vibrate({ duration })
  const impact = (style = ImpactStyle.Medium) => Haptics.impact({ style })
  const notification = (type = NotificationType.Success) => Haptics.notification({ type })
  const selection = async () => {
    await Haptics.selectionStart()
    await Haptics.selectionChanged()
    await Haptics.selectionEnd()
  }

  return { supported, vibrate, impact, notification, selection, ImpactStyle, NotificationType }
}
