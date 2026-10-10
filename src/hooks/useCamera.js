import { useState } from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

// Cámara y galería del teléfono con Camera.getPhoto().
export default function useCamera() {
  const [photo, setPhoto] = useState('')
  const [error, setError] = useState('')

  const getPhoto = async (source) => {
    try {
      const result = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source,
      })
      setPhoto(result.dataUrl ?? '')
      setError('')
    } catch (err) {
      const cancelled = String(err?.message ?? '').toLowerCase().includes('cancel')
      if (!cancelled) setError('No se pudo abrir la cámara. Revisa el permiso.')
    }
  }

  const takePhoto = () => getPhoto(CameraSource.Camera)
  const pickFromGallery = () => getPhoto(CameraSource.Photos)
  const clearPhoto = () => setPhoto('')

  return { photo, error, takePhoto, pickFromGallery, clearPhoto }
}
