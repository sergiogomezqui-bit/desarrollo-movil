import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import { FAKE_CONTACTS } from './data/fakeContacts'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simula la carga inicial de datos desde un servidor
    const timer = setTimeout(() => {
      setContacts(FAKE_CONTACTS)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleAddContact = (newContact) => {
    setContacts((prev) => [...prev, { id: Date.now(), ...newContact }])
  }

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mis Contactos</h1>
        <p>Agrega o elimina contactos de tu agenda</p>
      </header>

      <main className="app-main">
        {loading ? (
          <Loader />
        ) : (
          <>
            <ContactForm onAdd={handleAddContact} />
            <ContactList contacts={contacts} onDelete={handleDeleteContact} />
          </>
        )}
      </main>
    </div>
  )
}

export default App
