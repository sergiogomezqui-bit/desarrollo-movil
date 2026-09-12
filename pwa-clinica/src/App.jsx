import { useEffect, useMemo, useState } from 'react'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import PatientForm from './components/PatientForm'
import PatientList from './components/PatientList'
import SearchBar from './components/SearchBar'
import './App.css'

const PATIENTS_KEY = 'mediclinic_pwa_patients'

function loadPatients() {
  try {
    const raw = localStorage.getItem(PATIENTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const { user, loading, logout } = useAuth()
  const [patients, setPatients] = useState(loadPatients)
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients))
  }, [patients])

  function handleAddPatient(patient) {
    setPatients((prev) => [...prev, patient])
  }

  const filteredPatients = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return patients
    return patients.filter(
      (p) =>
        p.firstName.toLowerCase().includes(term) ||
        p.lastName.toLowerCase().includes(term) ||
        p.cc.toLowerCase().includes(term)
    )
  }, [patients, search])

  if (loading) return null

  if (!user) {
    return <Login />
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>MediClinic — Pacientes</h1>
          <p className="welcome">Hola, {user.name}</p>
        </div>
        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <main className="app-main">
        <PatientForm onAdd={handleAddPatient} />

        <section className="patients-section">
          <h2>Pacientes registrados ({patients.length})</h2>
          <SearchBar value={search} onChange={setSearch} />
          <PatientList patients={filteredPatients} />
        </section>
      </main>
    </div>
  )
}
