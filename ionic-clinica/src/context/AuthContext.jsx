import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const FIXED_DOCTORS = [
  { username: 'dr.rios', password: 'rios123', name: 'Dra. Camila Ríos', specialty: 'Medicina General' },
  { username: 'dr.mora', password: 'mora123', name: 'Dr. Andrés Mora', specialty: 'Pediatría' },
]

const STORAGE_KEY = 'mediclinic_ionic_session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  function login(username, password) {
    const found = FIXED_DOCTORS.find(
      (u) => u.username === username && u.password === password
    )
    if (!found) {
      return { ok: false, error: 'Usuario o contraseña incorrectos.' }
    }
    const session = { username: found.username, name: found.name, specialty: found.specialty }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    setUser(session)
    return { ok: true }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
