import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import './index.css'
import App from './App.jsx'

// Para que la cámara también funcione en el navegador.
defineCustomElements(window)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
