import { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

// Rivales de relleno si todavia no hay 4 usuarios reales con puntaje
const DEMO = [
  { id: 'demo-1', name: 'Camila R.', points: 90, demo: true },
  { id: 'demo-2', name: 'Andres P.', points: 70, demo: true },
  { id: 'demo-3', name: 'Valentina G.', points: 50, demo: true },
  { id: 'demo-4', name: 'Mateo L.', points: 30, demo: true },
]

// Top 5 en tiempo real: 4 rivales (usuarios reales de Firestore; si faltan se
// completan con demos) + el usuario actual con su puntaje local.
export function useRanking(uid, name, myPoints) {
  const [others, setOthers] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'scores'), orderBy('points', 'desc'), limit(10))
    return onSnapshot(
      q,
      (snap) => {
        setError(false)
        setOthers(snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((d) => d.id !== uid))
      },
      () => setError(true)
    )
  }, [uid])

  const real = others.slice(0, 4)
  const rivals = [...real, ...DEMO.slice(0, 4 - real.length)]
  const list = [...rivals, { id: uid, name, points: myPoints, me: true }]
    .sort((a, b) => b.points - a.points || (a.me ? 1 : -1))
    .map((item, i) => ({ ...item, rank: i + 1 }))

  return { list, error }
}
