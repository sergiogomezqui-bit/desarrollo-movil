import { IonApp, setupIonicReact } from '@ionic/react'

import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import './App.css'
import { useAuth } from './context/AuthContext'
import { ClinicDataProvider } from './context/ClinicDataContext'
import LoginPage from './pages/LoginPage'
import TabsLayout from './pages/TabsLayout'

setupIonicReact()

export default function App() {
  const { user, loading } = useAuth()

  if (loading) return null

  return (
    <IonApp>
      {!user ? (
        <LoginPage />
      ) : (
        <ClinicDataProvider>
          <TabsLayout />
        </ClinicDataProvider>
      )}
    </IonApp>
  )
}
