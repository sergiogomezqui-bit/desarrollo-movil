import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u ? { uid: u.uid, email: u.email, name: u.displayName || u.email } : null)
        setLoading(false)
      }),
    []
  )

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const register = async ({ name, email, password }) => {
    const { user: created } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(created, { displayName: name })
    setUser({ uid: created.uid, email, name })
  }

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
