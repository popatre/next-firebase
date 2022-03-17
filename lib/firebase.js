// Import the functions you need from the SDKs you need
import {
    firebase,
    initializeApp,
    auth,
    storage,
    firestore,
} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: "next-firebase-e86bc.firebaseapp.com",
    projectId: "next-firebase-e86bc",
    storageBucket: "next-firebase-e86bc.appspot.com",
    messagingSenderId: "197520342594",
    appId: "1:197520342594:web:f23f5bf1b4b7ee0779f7db",
    measurementId: "G-7S7RWK03JV",
};

// Initialize Firebase

if (!firebase.apps.length) {
    initializeApp(firebaseConfig);
}

export { auth, firestore, storage };
