importScripts("https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js");

console.log("root");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATF4b77jYWBTyWUa70ONitSxUwZ7QtQCU",
  authDomain: "habitai-391719.firebaseapp.com",
  projectId: "habitai-391719",
  storageBucket: "habitai-391719.appspot.com",
  messagingSenderId: "104807834649",
  appId: "1:104807834649:web:190cc2562190fc8894f688",
  measurementId: "G-GPFDSMCCZW",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
