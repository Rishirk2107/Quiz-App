// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// 🔥 Your Firebase config (Replace with your actual credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDcWnOGX6YydUSFTmf6n-YorFPKAl3uPwM",
  authDomain: "algorhythms-dc8fd.firebaseapp.com",
  projectId: "algorhythms-dc8fd",
  storageBucket: "algorhythms-dc8fd.firebasestorage.app",
  messagingSenderId: "926274024197",
  appId: "1:926274024197:web:e0b2468b84cb88b44a3d6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, addDoc, collection };
