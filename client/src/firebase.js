// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ef446.firebaseapp.com",
  projectId: "mern-blog-ef446",
  storageBucket: "mern-blog-ef446.firebasestorage.app",
  messagingSenderId: "484571222830",
  appId: "1:484571222830:web:be8e28b8a744f9f9f660bf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);