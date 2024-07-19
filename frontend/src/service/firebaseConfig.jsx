// Import the FIREBASE functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "maibro.firebaseapp.com",
  projectId: "maibro",
  storageBucket: "maibro.appspot.com",
  messagingSenderId: "627669864890",
  appId: "1:627669864890:web:19dcdcbe7df79b7c1b8d83",
  measurementId: "G-X7CLMEKLRQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseMessaging = getMessaging(firebaseApp);

export { firebaseAuth, firebaseMessaging };
