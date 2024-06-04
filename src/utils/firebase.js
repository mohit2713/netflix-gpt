// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKUsNfNdNn5oM6MsOZfc5tsyJwOZ7AQvQ",
  authDomain: "netflix-gpt-1825a.firebaseapp.com",
  projectId: "netflix-gpt-1825a",
  storageBucket: "netflix-gpt-1825a.appspot.com",
  messagingSenderId: "652782235200",
  appId: "1:652782235200:web:b4dd82471ad9bb5d18b9a5",
  measurementId: "G-H66E39217E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
