self.addEventListener("message", (event) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log("Hello World");
  console.log(event);
  self.registration.showNotification("Hello World");
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "Something Has Happened";
  const message =
    data.message || "Here's something you might want to check out.";
  console.log("push/sw/public", JSON.stringify(event));
  self.registration.showNotification(title, {
    body: message || data.body,
    icon: "/icon-512x512.png",
  });
});

self.addEventListener(
  "notificationclick",
  (event) => {
    // open a window to the app's homepage and close the notification
    event.waitUntil(clients.openWindow("https://habitai.co/home"));
    event.notification.close();
  },
  false
);

// hello world on install
self.addEventListener("install", (event) => {
  console.log("Hello/sw/public world from the Service Worker 2 🤙");
});

// hello world on activate
self.addEventListener("activate", (event) => {
  console.log("Hello/sw/public world from the Service Worker 1 🤙");
});

if ("serviceWorker" in navigator) {
  importScripts(
    "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
  );

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
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  console.log("messaging", messaging);

  messaging.onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });

  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  messaging.setBackgroundMessageHandler(function (payload) {
    const title = "Hello World";
    const option = { data: { notification: { body: payload.data.status } } };
    return self.registration.showNotification(title, option);
  });
}
