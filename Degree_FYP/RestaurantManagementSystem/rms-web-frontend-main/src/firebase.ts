import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSo0KGi3y6gv-Aipci0GTu0iF-k8vC7ys",
    authDomain: "rms-web-app-fc325.firebaseapp.com",
    projectId: "rms-web-app-fc325",
    storageBucket: "rms-web-app-fc325.firebasestorage.app",
    messagingSenderId: "324218943180",
    appId: "1:324218943180:web:a50339f0b2c3d961baf469"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Set up Google provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };