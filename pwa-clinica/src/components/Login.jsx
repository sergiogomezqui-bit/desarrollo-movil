import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const result = login(username.trim(), password)
    if (!result.ok) {
      setError(result.error)
    } else {
      setError('')
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>MediClinic</h1>
        <p className="subtitle">Administración de pacientes</p>

        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          autoComplete="username"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Ingresar</button>

        <div className="hint">
          Usuarios de prueba: <code>admin / admin123</code> o{' '}
          <code>recepcion / recepcion123</code>
        </div>
      </form>
    </div>
  )
}
