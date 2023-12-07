// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-SEoc7D5HzwsnGzPQ9yYs3n46KZCLvmw",
  authDomain: "trip-simple-20c18.firebaseapp.com",
  projectId: "trip-simple-20c18",
  storageBucket: "trip-simple-20c18.appspot.com",
  messagingSenderId: "505505123657",
  appId: "1:505505123657:web:f8afd243c3fa1f22c75e98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const tripsRef = collection(db, "trips");
