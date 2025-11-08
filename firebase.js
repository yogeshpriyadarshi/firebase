// Import Firebase core and auth
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

// Your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBKSNEv107SSMt2BemiVTN2fvqdJoAKy5Y",
  authDomain: "rti-express.firebaseapp.com",
  projectId: "rti-express",
  storageBucket: "rti-express.firebasestorage.app",
  messagingSenderId: "932745465598",
  appId: "1:932745465598:web:15b5a67a55f35a70ed5faf",
  measurementId: "G-PPFRPF9C5M"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize auth module
const auth = getAuth(app);
const messaging = getMessaging(app);

export {auth, messaging };
