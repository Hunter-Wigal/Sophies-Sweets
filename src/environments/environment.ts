// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FirebaseStorage } from "firebase/storage";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD13AN3HiBPMEau5gDhQ-3SZUiwiLQ3psU",
  authDomain: "sophiessweets-785d8.firebaseapp.com",
  projectId: "sophiessweets-785d8",
  storageBucket: "sophiessweets-785d8.appspot.com",
  messagingSenderId: "560782189550",
  appId: "1:560782189550:web:64f7ac6c33c7904ba264ff",
  measurementId: "G-6DVTPZBEW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storageRef = getStorage(app);