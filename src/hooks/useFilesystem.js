import { useCallback, useState } from 'react'
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'

const FOLDER = 'sensores'

// Archivos del teléfono: crear/escribir, leer, listar y borrar en el almacenamiento privado de la app.
export default function useFilesystem() {
  const [files, setFiles] = useState([])
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const listFiles = useCallback(async () => {
    try {
      const result = await Filesystem.readdir({ path: FOLDER, directory: Directory.Data })
      setFiles(result.files.map((file) => file.name))
      setError('')
    } catch {
      setFiles([])
    }
  }, [])

  const writeFile = async (name, text) => {
    try {
      await Filesystem.writeFile({
        path: FOLDER + '/' + name,
        data: text,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
        recursive: true,
      })
      setMessage('Archivo "' + name + '" guardado.')
      setError('')
      await listFiles()
      return true
    } catch {
      setError('No se pudo guardar el archivo.')
      return false
    }
  }

  const readFile = async (name) => {
    try {
      const result = await Filesystem.readFile({
        path: FOLDER + '/' + name,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      })
      setContent(typeof result.data === 'string' ? result.data : '')
      setMessage('Leyendo "' + name + '".')
      setError('')
    } catch {
      setError('No se pudo leer el archivo.')
    }
  }

  const deleteFile = async (name) => {
    try {
      await Filesystem.deleteFile({ path: FOLDER + '/' + name, directory: Directory.Data })
      setMessage('Archivo "' + name + '" eliminado.')
      setContent('')
      setError('')
      await listFiles()
    } catch {
      setError('No se pudo eliminar el archivo.')
    }
  }

  return { files, content, error, message, listFiles, writeFile, readFile, deleteFile }
}
