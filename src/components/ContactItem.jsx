import './ContactItem.css'

function ContactItem({ contact, onDelete }) {
  return (
    <li className="contact-item">
      <div>
        <p className="contact-name">{contact.name}</p>
        <p className="contact-phone">{contact.phone}</p>
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(contact.id)}
      >
        Eliminar
      </button>
    </li>
  )
}

export default ContactItem
