import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/config.js'

const MENSAJES = {
  'auth/invalid-email': 'El correo no es válido.',
  'auth/missing-password': 'Escribe una contraseña.',
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/user-not-found': 'Correo o contraseña incorrectos.',
  'auth/wrong-password': 'Correo o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ese correo ya está registrado.',
  'auth/weak-password': 'La contraseña debe tener mínimo 6 caracteres.',
  'auth/network-request-failed': 'No hay conexión a internet.',
  'auth/too-many-requests': 'Demasiados intentos, espera un momento.',
}

function mensajeDeError(error) {
  return MENSAJES[error?.code] ?? 'Ocurrió un error, intenta de nuevo.'
}

// Toda la lógica de Firebase Auth vive aquí, los componentes solo consumen el resultado.
export default function useFirebaseAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  const run = async (action) => {
    try {
      await action()
      return { ok: true }
    } catch (error) {
      return { ok: false, message: mensajeDeError(error) }
    }
  }

  const login = (email, password) => run(() => signInWithEmailAndPassword(auth, email, password))
  const register = (email, password) => run(() => createUserWithEmailAndPassword(auth, email, password))
  const logout = () => run(() => signOut(auth))

  return { user, loading, login, register, logout }
}
