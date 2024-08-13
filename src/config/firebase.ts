// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5V_iqSYR58mp5ws11Ss7zX5IuaWrE4k0",
    authDomain: "workaholical.firebaseapp.com",
    projectId: "workaholical",
    storageBucket: "workaholical.appspot.com",
    messagingSenderId: "178244283430",
    appId: "1:178244283430:web:89ffee60d1023c57660ae7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const database = getFirestore(app); 