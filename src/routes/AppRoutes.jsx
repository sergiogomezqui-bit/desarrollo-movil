import { IonRouterOutlet, IonSpinner } from '@ionic/react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import UserRoutes from './UserRoutes'

// Sin sesion solo se ven login/registro; con sesion, las pestanas de la app
export default function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return <IonSpinner style={{ margin: '40vh auto', display: 'block' }} />

  if (!user) {
    return (
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/login" />
      </IonRouterOutlet>
    )
  }
  return <UserRoutes />
}
