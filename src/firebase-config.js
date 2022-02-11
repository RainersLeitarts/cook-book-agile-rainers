import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyABWbUYtV50cI0AqIW7X8jfKX6ubjTNvbI",
  authDomain: "cookboook-1a8ba.firebaseapp.com",
  projectId: "cookboook-1a8ba",
  storageBucket: "cookboook-1a8ba.appspot.com",
  messagingSenderId: "599629056903",
  appId: "1:599629056903:web:684ccddb8e081bca336122"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore()