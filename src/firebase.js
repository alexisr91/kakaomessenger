import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Utiliser ces 3 imports pour importer le module FIrebase correctement
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// les config firebase sont cnesés être dans un fichier .env, toutes les clés de sécu doivent etre dan un fichier .env
const firebaseConfig = {
  apiKey: "AIzaSyACZNxZXSVZ8Ne7Ui90dNktVgf7v2mHQTo",
  authDomain: "pd-kakaotalk-d981a.firebaseapp.com",
  projectId: "pd-kakaotalk-d981a",
  storageBucket: "pd-kakaotalk-d981a.appspot.com",
  messagingSenderId: "1059408195097",
  appId: "1:1059408195097:web:30618bc08aaea258b88488",
  measurementId: "G-6RN3JG1XN3",
};

const firebase = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(firebase);
const db = getFirestore(firebase);

export { auth, provider };
export default db;
export { collection, addDoc, serverTimestamp };
