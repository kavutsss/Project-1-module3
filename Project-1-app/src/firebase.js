// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtCgxh5f0wp8DLH6gCGWgzceZ4fytw9Is",
  authDomain: "project-1-module3.firebaseapp.com",
  projectId: "project-1-module3",
  storageBucket: "project-1-module3.firebasestorage.app",
  messagingSenderId: "867860692988",
  appId: "1:867860692988:web:27ca5674ec219129b47c79",
  measurementId: "G-J01D75XNE7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
