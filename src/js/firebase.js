import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD5WaIv-E3uj9iPN-D56C-QKTs8nTB5ZBs",
  authDomain: "ink-ui.firebaseapp.com",
  projectId: "ink-ui",
  storageBucket: "ink-ui.appspot.com",
  messagingSenderId: "476257865093",
  appId: "1:476257865093:web:04e10dcbfc1d8cf1e348ec",
  measurementId: "G-JDVRQJ7PFF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app) 
const auth = getAuth(app)

export { db, auth }
