// Distancia (m) que hay que recorrer para completar la mision de movimiento
export const MOVE_METERS = 50
// Segundos quieto para la ultima mision
export const STILL_SECONDS = 10

export const MISSIONS = [
  { id: 1, title: 'Evidencia', description: 'Toma una foto con la camara y guardala', points: 30 },
  { id: 2, title: 'Movimiento real', description: `Muevete ${MOVE_METERS} metros desde tu posicion original`, points: 50 },
  { id: 3, title: 'Permanencia activa', description: `Quedate quieto ${STILL_SECONDS} segundos y el celular vibrara`, points: 40 },
]

export const TOTAL_POINTS = MISSIONS.reduce((sum, m) => sum + m.points, 0)

// Estado inicial: { points: 0, missions: [{ id, completed }] }
export const emptyProgress = () => ({
  points: 0,
  missions: MISSIONS.map((m) => ({ id: m.id, completed: false })),
})

export const isCompleted = (progress, id) =>
  progress.missions.some((m) => m.id === id && m.completed)

export const completedCount = (progress) => progress.missions.filter((m) => m.completed).length

export const percent = (progress) => Math.round((completedCount(progress) / MISSIONS.length) * 100)

// La mision 3 solo se habilita cuando la 2 ya esta completa
export const isUnlocked = (progress, id) => id !== 3 || isCompleted(progress, 2)

// Distancia entre dos coordenadas (formula de Haversine), en metros
export function distanceMeters(a, b) {
  const R = 6371000
  const rad = (d) => (d * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

// Une dos avances (local y nube): una mision completada nunca se pierde
export function mergeProgress(a, b) {
  const missions = MISSIONS.map((m) => ({
    id: m.id,
    completed: isCompleted(a, m.id) || isCompleted(b, m.id),
  }))
  const points = missions.reduce((sum, m) => sum + (m.completed ? MISSIONS.find((x) => x.id === m.id).points : 0), 0)
  return { points, missions }
}

export function readLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return null
  }
}

export function writeLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // almacenamiento lleno o bloqueado: la app sigue con Firebase
  }
}

export function authMessage(err) {
  const map = {
    'auth/invalid-credential': 'Correo o contrasena incorrectos',
    'auth/email-already-in-use': 'Ese correo ya esta registrado',
    'auth/weak-password': 'La contrasena debe tener al menos 6 caracteres',
    'auth/invalid-email': 'Correo invalido',
    'auth/network-request-failed': 'Sin conexion',
  }
  return map[err?.code] || 'No se pudo completar la accion'
}
