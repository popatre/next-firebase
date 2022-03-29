// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: "next-firebase-e86bc.firebaseapp.com",
    projectId: "next-firebase-e86bc",
    storageBucket: "next-firebase-e86bc.appspot.com",
    messagingSenderId: "197520342594",
    appId: "1:197520342594:web:f23f5bf1b4b7ee0779f7db",
    measurementId: "G-7S7RWK03JV",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

/** 

*/

async function getUserWithUsername(username) {
    const usersRef = firestore.collection("users");
    const query = usersRef.where("username", "==", username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
}

function postToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
        created_at: data.created_at.toMillis(),
        updated_at: data.updated_at.toMillis(),
    };
}

const fromMillis = firebase.firestore.Timestamp.fromMillis;
const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp;
const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
const increment = firebase.firestore.FieldValue.increment;

export {
    auth,
    firestore,
    storage,
    googleAuthProvider,
    getUserWithUsername,
    postToJSON,
    fromMillis,
    serverTimeStamp,
    STATE_CHANGED,
    increment,
};
