import { useLocation } from 'react-router-dom'
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useAuth } from '../context/AuthContext.jsx'
import { useOnline } from '../context/NetworkContext.jsx'

const LINKS = [
  { to: '/contacts', label: 'Contactos' },
  { to: '/tasks', label: 'Tareas' },
  { to: '/fruits', label: 'Frutas' },
]

export default function AppLayout({ title, needsNetwork = false, children }) {
  const { user, logout } = useAuth()
  const online = useOnline()
  const { pathname } = useLocation()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonBadge color={online ? 'success' : 'danger'}>{online ? 'En línea' : 'Sin conexión'}</IonBadge>
            <IonButton onClick={logout}>Salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p className="user-email">{user?.email}</p>
        {needsNetwork && !online && (
          <IonText color="danger">
            <p className="offline-note">Sin conexión: no puedes agregar, editar ni eliminar hasta que vuelva el internet.</p>
          </IonText>
        )}
        {children}
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <nav className="bottom-nav">
            {LINKS.map((link) => (
              <IonButton
                key={link.to}
                routerLink={link.to}
                routerDirection="root"
                fill={pathname === link.to ? 'solid' : 'clear'}
                size="small"
              >
                {link.label}
              </IonButton>
            ))}
          </nav>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}
