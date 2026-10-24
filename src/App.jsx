import { IonApp, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { AuthProvider } from './context/AuthContext'
import { MissionsProvider } from './context/MissionsContext'
import AppRoutes from './routes/AppRoutes'

setupIonicReact()

export default function App() {
  return (
    <IonApp>
      <AuthProvider>
        <MissionsProvider>
          <IonReactRouter>
            <AppRoutes />
          </IonReactRouter>
        </MissionsProvider>
      </AuthProvider>
    </IonApp>
  )
}
