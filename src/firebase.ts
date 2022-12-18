// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { fireBaseData } from './firebaseData'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: fireBaseData.apiKey,
  authDomain: fireBaseData.authDomain,
  projectId: fireBaseData.projectId,
  storageBucket: fireBaseData.storageBucket,
  messagingSenderId: fireBaseData.messagingSenderId,
  appId: fireBaseData.appId,
  measurementId: fireBaseData.measurementId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app)
export const table = fireBaseData.table
