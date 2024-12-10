import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf_kzLiLtutVHS1RiLNcVkpcmLkxrGar8",
  authDomain: "zwitter-clone.firebaseapp.com",
  projectId: "zwitter-clone",
  storageBucket: "zwitter-clone.firebasestorage.app",
  messagingSenderId: "81102404127",
  appId: "1:81102404127:web:8639f9ca62b4f9599a732a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);