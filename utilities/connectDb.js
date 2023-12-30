// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

function getDb() {
  const firebaseConfig = {
    apiKey: process.env._FIREBASE_KEY,
    authDomain: "auth-se-f2101.firebaseapp.com",
    projectId: "auth-se-f2101",
    storageBucket: "auth-se-f2101.appspot.com",
    messagingSenderId: "69128162367",
    appId: "1:69128162367:web:76b94ccc4e31cb5df9bc8a",
    measurementId: "G-5FXL8TK5JE",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
}

export default getDb;
