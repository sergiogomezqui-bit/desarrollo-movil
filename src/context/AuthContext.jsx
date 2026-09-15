import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const VALID_EMAIL = 'user@mail.com'
const VALID_PASSWORD = '123'

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(() => localStorage.getItem('logged') === 'true')

  const login = (email, password) => {
    if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
      return false
    }
    localStorage.setItem('logged', 'true')
    setLogged(true)
    return true
  }

  const logout = () => {
    localStorage.removeItem('logged')
    setLogged(false)
  }

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
