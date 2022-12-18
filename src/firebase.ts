// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { doc, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBYQmuvus3fjrEA5UoX9_qc5rZnTs_IEJA',
  authDomain: 'geomarker-f46c6.firebaseapp.com',
  projectId: 'geomarker-f46c6',
  storageBucket: 'geomarker-f46c6.appspot.com',
  messagingSenderId: '252963572833',
  appId: '1:252963572833:web:ca41a4bdef3a672e072e20',
  measurementId: 'G-X3PYK25DZ4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app)
export const docRef = doc(db, 'votes', 'pXpafCsBhbPBkquiaDjV')
