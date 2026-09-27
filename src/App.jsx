import { Navigate, Route, Routes } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import { TasksProvider } from './context/TasksContext.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import TasksListPage from './pages/TasksListPage.jsx'
import TaskFormPage from './pages/TaskFormPage.jsx'
import TaskDetailPage from './pages/TaskDetailPage.jsx'

setupIonicReact()

export default function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tasks" element={<RequireAuth><TasksListPage /></RequireAuth>} />
                <Route path="/tasks/new" element={<RequireAuth><TaskFormPage /></RequireAuth>} />
                <Route path="/tasks/:id" element={<RequireAuth><TaskDetailPage /></RequireAuth>} />
                <Route path="/tasks/:id/edit" element={<RequireAuth><TaskFormPage /></RequireAuth>} />
                <Route path="/" element={<Navigate to="/tasks" replace />} />
              </Routes>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </TasksProvider>
    </AuthProvider>
  )
}
