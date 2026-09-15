import { Navigate, Route, Routes } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ListPage from './pages/ListPage.jsx'

setupIonicReact()

export default function App() {
  return (
    <AuthProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthProvider>
  )
}
