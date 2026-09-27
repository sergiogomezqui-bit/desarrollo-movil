import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyADKPEDTa1UXuI7Uxkz9hkGMJ4Dszu0uOk',
  authDomain: 'desarrollo-movil-uao.firebaseapp.com',
  projectId: 'desarrollo-movil-uao',
  storageBucket: 'desarrollo-movil-uao.firebasestorage.app',
  messagingSenderId: '441532863095',
  appId: '1:441532863095:web:5341fee9bb7cc2b5c12c72',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
