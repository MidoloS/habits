"use strict";

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//
// self.__WB_DISABLE_DEV_LOGS = true

// listen to message event from window
self.addEventListener("message", (event) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log("Hello World");
  self.registration.showNotification("Hello World");
});

self.addEventListener("push", (event) => {
  console.log("push/worker", event);
});

// hello world on install
self.addEventListener("install", (event) => {
  console.log("Hello/worker world from the Service Worker 2 🤙");
});

// hello world on activate
self.addEventListener("activate", (event) => {
  console.log("Hello/worker world from the Service Worker 1 🤙");
});

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
