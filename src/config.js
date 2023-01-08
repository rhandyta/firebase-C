import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCvx7fLlNR0M9-T7kYJwDMCc24KogNHqBQ",
    authDomain: "fir-app-2f012.firebaseapp.com",
    projectId: "fir-app-2f012",
    storageBucket: "fir-app-2f012.appspot.com",
    messagingSenderId: "834162457885",
    appId: "1:834162457885:web:3f9033409755ccd583f5f4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
