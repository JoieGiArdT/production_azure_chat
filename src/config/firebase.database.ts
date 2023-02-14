// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'

class FirebaseFireStore {
  private readonly firebaseConfig = {
    apiKey: 'AIzaSyDv9KnwwS0lrEk2mjOG0uLfQo8M24-14ck',
    authDomain: 'chat-app-c05a5.firebaseapp.com',
    projectId: 'chat-app-c05a5',
    storageBucket: 'chat-app-c05a5.appspot.com',
    messagingSenderId: '215191900706',
    appId: '1:215191900706:web:cc7e042b9abd47c6bab07b',
    measurementId: 'G-CNNRD1JFD6'
  }

  private readonly application: FirebaseApp
  public dataBase!: Firestore
  constructor () {
    this.application = initializeApp(this.firebaseConfig)
    this.initializeFirestore(this.application)
  }

  initializeFirestore (app: FirebaseApp): void {
    this.dataBase = getFirestore(app)
  }
}

export default new FirebaseFireStore()
