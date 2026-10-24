import React from 'react'
import { createRoot } from 'react-dom/client'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import App from './App'

// Habilita la camara de Capacitor en el navegador
defineCustomElements(window)

createRoot(document.getElementById('root')).render(<App />)
