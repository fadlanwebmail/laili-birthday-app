// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv-ymRc3da77Gk8niBp-Ai0IXavAJ5EgY",
  authDomain: "laili-birthday.firebaseapp.com",
  projectId: "laili-birthday",
  storageBucket: "laili-birthday.firebasestorage.app",
  messagingSenderId: "165799794057",
  appId: "1:165799794057:web:ba84fd9cc44e33a7bdfd58",
  measurementId: "G-V07E1TWWJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);