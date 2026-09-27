import { Navigate } from 'react-router-dom'
import { IonPage, IonContent, IonSpinner } from '@ionic/react'
import { useAuth } from '../context/AuthContext.jsx'

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <IonPage>
        <IonContent>
          <div className="center-state">
            <IonSpinner name="crescent" />
          </div>
        </IonContent>
      </IonPage>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}
