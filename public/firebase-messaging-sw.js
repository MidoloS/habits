// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
  console.log("hello from sw");
  console.log(event.data);
});

self.addEventListener("push", (event) => {
  console.log("push", event);
});

// hello world on install
self.addEventListener("install", (event) => {
  console.log("Hello world from the Service Worker 2 🤙");
});

// hello world on activate
self.addEventListener("activate", (event) => {
  console.log("Hello world from the Service Worker 1 🤙");
});

if ("serviceWorker" in navigator) {
  importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
  );

  console.log("public");

  const firebaseConfig = {
    apiKey: "AIzaSyATF4b77jYWBTyWUa70ONitSxUwZ7QtQCU",
    authDomain: "habitai-391719.firebaseapp.com",
    projectId: "habitai-391719",
    storageBucket: "habitai-391719.appspot.com",
    messagingSenderId: "104807834649",
    appId: "1:104807834649:web:190cc2562190fc8894f688",
    measurementId: "G-GPFDSMCCZW",
  };

  console.log("fire", firebase);

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  const isSupported = firebase.messaging.isSupported();

  console.log("support", isSupported);

  if (isSupported) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(
      ({ notification: { title, body, image } }) => {
        self.registration.showNotification(title, {
          body,
          icon: image || "/assets/icons/icon-72x72.png",
        });
      }
    );
    //   const token = firebase.getToken(messaging, {
    //     vapidKey:
    //       "BPq2545hDXGs4Gx2RqWw_dtokiqEQDjoG81YoUjV30j3wk5nZ9jwxK7_kj01Cwrm1h4tenvje8saelksUkVoSWs",
    //   });

    console.log({ firebase });
  } else {
    throw new Error("Firebase is not supported in this browser");
  }

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
}
