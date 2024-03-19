// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq7edNwLsM9CBEi4ouU8JEEZYV8tLkYsU",
  authDomain: "testproject-c245d.firebaseapp.com",
  projectId: "testproject-c245d",
  storageBucket: "testproject-c245d.appspot.com",
  messagingSenderId: "558561127209",
  appId: "1:558561127209:web:b85945c8275b13ee646538"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);