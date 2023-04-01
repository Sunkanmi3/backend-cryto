import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCauryPMLdwDbC_vbWdQ6C8mZYL7BQfHx4",
  authDomain: "backend-db-94e9f.firebaseapp.com",
  projectId: "backend-db-94e9f",
  storageBucket: "backend-db-94e9f.appspot.com",
  messagingSenderId: "636777729892",
  appId: "1:636777729892:web:bb1cdfe2ef0d91b0b23471",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
