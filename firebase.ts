import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDojruH1lonIh2BF1F7X3k6Q-q_Yc6c7Rc',
	authDomain: 'astraynotes.firebaseapp.com',
	projectId: 'astraynotes',
	storageBucket: 'astraynotes.appspot.com',
	messagingSenderId: '504962340593',
	appId: '1:504962340593:web:a07af349a4034df6303b50'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const notesCollection = collection(db, 'notes')
