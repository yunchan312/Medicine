// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFv6CZjZ1WumXWqne4jatoqQWRSNqbIuc",
  authDomain: "vitaminsite-810a9.firebaseapp.com",
  projectId: "vitaminsite-810a9",
  storageBucket: "vitaminsite-810a9.appspot.com",
  messagingSenderId: "521713503477",
  appId: "1:521713503477:web:419a8b7d2ec692102f49bc",
  measurementId: "G-GC5CWL5RPL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
