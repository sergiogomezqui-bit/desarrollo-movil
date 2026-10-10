import { Route, Routes } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import HomePage from './pages/HomePage.jsx'
import GeolocationPage from './pages/GeolocationPage.jsx'
import CameraPage from './pages/CameraPage.jsx'
import AccelerometerPage from './pages/AccelerometerPage.jsx'
import DevicePage from './pages/DevicePage.jsx'
import HapticsPage from './pages/HapticsPage.jsx'
import FilesystemPage from './pages/FilesystemPage.jsx'
import LocalNotificationsPage from './pages/LocalNotificationsPage.jsx'
import PushNotificationsPage from './pages/PushNotificationsPage.jsx'

setupIonicReact()

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/geolocation" element={<GeolocationPage />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/accelerometer" element={<AccelerometerPage />} />
            <Route path="/device" element={<DevicePage />} />
            <Route path="/haptics" element={<HapticsPage />} />
            <Route path="/filesystem" element={<FilesystemPage />} />
            <Route path="/local-notifications" element={<LocalNotificationsPage />} />
            <Route path="/push-notifications" element={<PushNotificationsPage />} />
          </Routes>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}
