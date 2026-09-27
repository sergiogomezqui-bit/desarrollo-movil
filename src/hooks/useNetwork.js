import { useEffect, useState } from 'react'
import { Network } from '@capacitor/network'

// Dice si el dispositivo tiene conexión y se actualiza cuando cambia.
export default function useNetwork() {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    let active = true
    let listener = null

    Network.getStatus().then((status) => {
      if (active) setOnline(status.connected)
    })

    Network.addListener('networkStatusChange', (status) => setOnline(status.connected)).then((handle) => {
      if (active) listener = handle
      else handle.remove()
    })

    return () => {
      active = false
      listener?.remove()
    }
  }, [])

  return online
}
