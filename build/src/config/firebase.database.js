"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
class FirebaseFireStore {
    constructor() {
        this.firebaseConfig = {
            apiKey: 'AIzaSyDv9KnwwS0lrEk2mjOG0uLfQo8M24-14ck',
            authDomain: 'chat-app-c05a5.firebaseapp.com',
            projectId: 'chat-app-c05a5',
            storageBucket: 'chat-app-c05a5.appspot.com',
            messagingSenderId: '215191900706',
            appId: '1:215191900706:web:cc7e042b9abd47c6bab07b',
            measurementId: 'G-CNNRD1JFD6'
        };
        this.application = (0, app_1.initializeApp)(this.firebaseConfig);
        this.initializeFirestore(this.application);
    }
    initializeFirestore(app) {
        this.dataBase = (0, firestore_1.getFirestore)(app);
    }
}
exports.default = new FirebaseFireStore();
