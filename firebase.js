// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCOkkoAd1qW_eOt2E1TkP_f3GlWfMzxMj0",
    authDomain: "e-clone-12d2b.firebaseapp.com",
    projectId: "e-clone-12d2b",
    storageBucket: "e-clone-12d2b.appspot.com",
    messagingSenderId: "703078079887",
    appId: "1:703078079887:web:65be0d4072955efc3abffa",
    measurementId: "G-EJC799R9X0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore and Auth services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
