import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB1cGrUlZjOLvolCw9y40OUxHb7HtNF2_s',
  authDomain: 'desarrollo-movil-sergio.firebaseapp.com',
  projectId: 'desarrollo-movil-sergio',
  storageBucket: 'desarrollo-movil-sergio.firebasestorage.app',
  messagingSenderId: '924600527896',
  appId: '1:924600527896:web:ca075584dee63cc2e6676d',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
