
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCmMkufUm5n6hD_jT_fLf_MiLPG5oo3T2Y",
    authDomain: "attendance-system-4006d.firebaseapp.com",
    projectId: "attendance-system-4006d",
    storageBucket: "attendance-system-4006d.appspot.com",
    messagingSenderId: "659110964272",
    appId: "1:659110964272:web:7f3c2dd60c2d50c9bc51f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app)

export const courseCollection = collection(database, "course")
export const usersCollection = collection(database, "users")