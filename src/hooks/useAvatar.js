import { useCallback, useEffect, useState } from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { supabase } from '../lib/supabase'

// Foto de perfil: se toma con la camara y se sube a avatars/<uid>/avatar.jpg
export function useAvatar(userId) {
  const [url, setUrl] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const path = `${userId}/avatar.jpg`

  const refresh = useCallback(async () => {
    const { data } = await supabase.storage.from('avatars').list(userId, { limit: 1, search: 'avatar.jpg' })
    if (data && data.length > 0) {
      const { data: pub } = supabase.storage.from('avatars').getPublicUrl(path)
      // El parametro evita que el navegador muestre la version anterior en cache
      setUrl(`${pub.publicUrl}?t=${Date.now()}`)
    } else {
      setUrl(null)
    }
  }, [userId, path])

  useEffect(() => {
    if (userId) refresh()
  }, [userId, refresh])

  const takePhoto = async () => {
    setError('')
    try {
      const photo = await Camera.getPhoto({
        quality: 70,
        width: 512,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      })
      setBusy(true)
      const blob = await (await fetch(photo.dataUrl)).blob()
      const { error: err } = await supabase.storage
        .from('avatars')
        .upload(path, blob, { upsert: true, contentType: 'image/jpeg' })
      if (err) throw err
      await refresh()
    } catch (err) {
      if (!/cancel/i.test(err?.message || '')) setError(err?.message || 'No se pudo subir la foto')
    } finally {
      setBusy(false)
    }
  }

  return { url, busy, error, takePhoto }
}
