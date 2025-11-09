// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// If you want Analytics in the browser, you can enable it guarded by `window`.
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRkb0O_23EP-8LxMxkmyi8EOvcTri4fcA",
  authDomain: "todo-list-a7cb2.firebaseapp.com",
  projectId: "todo-list-a7cb2",
  storageBucket: "todo-list-a7cb2.firebasestorage.app",
  messagingSenderId: "679676072991",
  appId: "1:679676072991:web:b8acf72e88e42b9ca0f12a",
  measurementId: "G-BWLVNDXZ90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Optionally enable analytics only in the browser:
// if (typeof window !== "undefined") { getAnalytics(app); }