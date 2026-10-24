import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthContext'
import {
  MISSIONS,
  completedCount,
  emptyProgress,
  isCompleted,
  isUnlocked,
  mergeProgress,
  readLocal,
  writeLocal,
} from '../helpers'
import { notify } from '../helpers/notify'

const MissionsContext = createContext(null)

export function MissionsProvider({ children }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState(emptyProgress)
  const [photo, setPhoto] = useState(null)
  const [sync, setSync] = useState('local') // local | syncing | synced | error
  const ready = useRef(false)

  const uid = user?.uid
  const key = uid ? `misiones:${uid}` : null

  // Carga: local primero (instantaneo) y despues se une con lo de Firebase
  useEffect(() => {
    ready.current = false
    if (!uid) {
      setProgress(emptyProgress())
      setPhoto(null)
      return
    }
    setProgress(readLocal(key) || emptyProgress())
    setPhoto(readLocal(`${key}:foto`))
    let cancelled = false
    getDoc(doc(db, 'scores', uid))
      .then((snap) => {
        if (cancelled) return
        if (snap.exists()) setProgress((cur) => mergeProgress(cur, { missions: snap.data().missions || [] }))
        setSync('synced')
      })
      .catch(() => !cancelled && setSync('error'))
      .finally(() => {
        if (!cancelled) ready.current = true
      })
    return () => {
      cancelled = true
    }
  }, [uid, key])

  // Persistencia: cada cambio se guarda en local y en Firebase
  useEffect(() => {
    if (!uid || !ready.current) return
    writeLocal(key, progress)
    setSync('syncing')
    setDoc(doc(db, 'scores', uid), {
      name: user.name,
      points: progress.points,
      missions: progress.missions,
      updatedAt: serverTimestamp(),
    })
      .then(() => setSync('synced'))
      .catch(() => setSync('error'))
  }, [progress]) // eslint-disable-line react-hooks/exhaustive-deps

  const complete = useCallback((id) => {
    setProgress((cur) => {
      if (isCompleted(cur, id) || !isUnlocked(cur, id)) return cur
      const mission = MISSIONS.find((m) => m.id === id)
      const next = {
        points: cur.points + mission.points,
        missions: cur.missions.map((m) => (m.id === id ? { ...m, completed: true } : m)),
      }
      const left = MISSIONS.length - completedCount(next)
      queueMicrotask(() => {
        notify('Has completado una mision', `${mission.title}: +${mission.points} puntos`)
        if (left === 1) setTimeout(() => notify('Casi listo', 'Te falta 1 mision para completar'), 1500)
      })
      return next
    })
  }, [])

  const savePhoto = (dataUrl) => {
    setPhoto(dataUrl)
    writeLocal(`${key}:foto`, dataUrl)
  }

  const reset = () => {
    setProgress(emptyProgress())
    setPhoto(null)
    if (key) writeLocal(`${key}:foto`, null)
  }

  return (
    <MissionsContext.Provider value={{ progress, photo, sync, complete, savePhoto, reset }}>
      {children}
    </MissionsContext.Provider>
  )
}

export const useMissions = () => useContext(MissionsContext)
