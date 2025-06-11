import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAftoNDVHJ2Ec_wrcZQbTf9ZKydzyamb10",
    authDomain: "ag-chido.firebaseapp.com",
    projectId: "ag-chido",
    storageBucket: "ag-chido.firebasestorage.app",
    messagingSenderId: "846729527198",
    appId: "1:846729527198:web:0b9bebf757a9070a43208f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
