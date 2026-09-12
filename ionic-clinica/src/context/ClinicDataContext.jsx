import { createContext, useContext, useEffect, useState } from 'react'
import { seedPatients, seedVisits } from '../data/seed'

const ClinicDataContext = createContext(null)

const PATIENTS_KEY = 'mediclinic_ionic_patients'
const VISITS_KEY = 'mediclinic_ionic_visits'

export const STATUS_FLOW = ['pendiente', 'en_camino', 'finalizada']

export const STATUS_LABELS = {
  pendiente: 'Pendiente',
  en_camino: 'En camino',
  finalizada: 'Finalizada',
}

function loadFromStorage(key, seed) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore malformed data and fall back to seed
  }
  localStorage.setItem(key, JSON.stringify(seed))
  return seed
}

export function ClinicDataProvider({ children }) {
  const [patients, setPatients] = useState(() => loadFromStorage(PATIENTS_KEY, seedPatients))
  const [visits, setVisits] = useState(() => loadFromStorage(VISITS_KEY, seedVisits))

  useEffect(() => {
    localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients))
  }, [patients])

  useEffect(() => {
    localStorage.setItem(VISITS_KEY, JSON.stringify(visits))
  }, [visits])

  function advanceVisitStatus(visitId) {
    setVisits((prev) =>
      prev.map((v) => {
        if (v.id !== visitId) return v
        const currentIndex = STATUS_FLOW.indexOf(v.status)
        const nextStatus = STATUS_FLOW[Math.min(currentIndex + 1, STATUS_FLOW.length - 1)]
        return { ...v, status: nextStatus }
      })
    )
  }

  return (
    <ClinicDataContext.Provider value={{ patients, visits, advanceVisitStatus }}>
      {children}
    </ClinicDataContext.Provider>
  )
}

export function useClinicData() {
  const ctx = useContext(ClinicDataContext)
  if (!ctx) throw new Error('useClinicData debe usarse dentro de ClinicDataProvider')
  return ctx
}
