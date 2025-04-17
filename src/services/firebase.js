
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBjhlijktc-XX8kjBj4RVUYWFPcrfpyaxI",
  authDomain: "govnetic.firebaseapp.com", 
  projectId: "govnetic",
  storageBucket: "govnetic.firebasestorage.app",
  messagingSenderId: "1094101722348",
  appId: "1:1094101722348:web:e2dec71810d221c37cf1c9",
  measurementId: "G-PG6Y4QXW26"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
