// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXiMMBDRxaajTgAO-lLeSIv8guEASpbus",
  authDomain: "wagyu-online-store.firebaseapp.com",
  projectId: "wagyu-online-store",
  storageBucket: "wagyu-online-store.appspot.com",
  messagingSenderId: "1050091873963",
  appId: "1:1050091873963:web:92b5fade55286fbb99b9ee",
  measurementId: "G-ZGQX3F384G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage}