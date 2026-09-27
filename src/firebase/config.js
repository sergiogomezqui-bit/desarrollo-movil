import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyB1cGrUlZjOLvolCw9y40OUxHb7HtNF2_s',
  authDomain: 'desarrollo-movil-sergio.firebaseapp.com',
  databaseURL: 'https://desarrollo-movil-sergio-default-rtdb.firebaseio.com',
  projectId: 'desarrollo-movil-sergio',
  storageBucket: 'desarrollo-movil-sergio.firebasestorage.app',
  messagingSenderId: '924600527896',
  appId: '1:924600527896:web:ca075584dee63cc2e6676d',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const rtdb = getDatabase(app)
