// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0q62k_Kgr8Xz4Pbd38S6nSeUGn78-fZY",
  authDomain: "expense-a575b.firebaseapp.com",
  projectId: "expense-a575b",
  storageBucket: "expense-a575b.appspot.com",
  messagingSenderId: "935928502332",
  appId: "1:935928502332:web:e07a0397fd0a3d62878b39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);