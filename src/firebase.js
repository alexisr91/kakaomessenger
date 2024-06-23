import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Utiliser ces 3 imports pour importer le module FIrebase correctement
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// les config firebase sont cnesés être dans un fichier .env, toutes les clés de sécu doivent etre dan un fichier .env
const firebaseConfig = {
 
};

const firebase = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(firebase);
const db = getFirestore(firebase);

export { auth, provider };
export default db;
export { collection, addDoc, serverTimestamp };
