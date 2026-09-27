import { createContext, useContext } from 'react'
import useFirebaseAuth from '../hooks/useFirebaseAuth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
