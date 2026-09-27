import { Navigate, Route, Routes } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import { NetworkProvider } from './context/NetworkContext.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import FruitsPage from './pages/FruitsPage.jsx'

setupIonicReact()

export default function App() {
  return (
    <AuthProvider>
      <NetworkProvider>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contacts" element={<RequireAuth><ContactsPage /></RequireAuth>} />
                <Route path="/tasks" element={<RequireAuth><TasksPage /></RequireAuth>} />
                <Route path="/fruits" element={<RequireAuth><FruitsPage /></RequireAuth>} />
                <Route path="/" element={<Navigate to="/contacts" replace />} />
              </Routes>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </NetworkProvider>
    </AuthProvider>
  )
}
