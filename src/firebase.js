// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// 🔥 Your Firebase config (Replace with your actual credentials)
const firebaseConfig = {
    apiKey: "AIzaSyBqHe7TFyY-pA2-OqFJRPdN4IZohSwj9H0",
    authDomain: "algorythms-24a1f.firebaseapp.com",
    projectId: "algorythms-24a1f",
    storageBucket: "algorythms-24a1f.firebasestorage.app",
    messagingSenderId: "455691534989",
    appId: "1:455691534989:web:1aaf8ea358d93e11f098c4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, addDoc, collection };
