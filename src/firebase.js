// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import "firebase/auth";
import "firebase/database";
import "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3QVJ_Fnbj9gQ1ADk4eiU8y0IGPCbvjSY",
  authDomain: "react-firebase-chatapp-5dca6.firebaseapp.com",
  projectId: "react-firebase-chatapp-5dca6",
  storageBucket: "react-firebase-chatapp-5dca6.appspot.com",
  messagingSenderId: "342451991144",
  appId: "1:342451991144:web:770ee1bfd347132a9601dd",
  measurementId: "G-DH3K31P4JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);