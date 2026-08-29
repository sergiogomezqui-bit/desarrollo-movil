import ContactItem from './ContactItem'
import './ContactList.css'

function ContactList({ contacts, onDelete }) {
  if (contacts.length === 0) {
    return <p className="empty-state">No hay contactos todavía.</p>
  }

  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default ContactList
