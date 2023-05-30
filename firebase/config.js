// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoE1F2o3WBpJaBh4ikFeVaEI6aFeyu0ck",
  authDomain: "ecclesia-church.firebaseapp.com",
  projectId: "ecclesia-church",
  storageBucket: "ecclesia-church.appspot.com",
  messagingSenderId: "975793776023",
  appId: "1:975793776023:web:8e11618d50db0eae6490d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
