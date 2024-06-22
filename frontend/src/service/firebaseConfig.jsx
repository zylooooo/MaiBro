// Import the FIREBASE functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4kPTTjC5c5ZtNmmKnQGKHOKO5gsk6dbI",
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

export { firebaseAuth };
