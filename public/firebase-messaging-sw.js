self.addEventListener("message", (event) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log("Hello World, n2");
  console.log(event);
});

const notificationByHour = (hour) => {
  switch (hour) {
    case 9:
      self.registration.showNotification("Are you awake? ☀️", {
        body: "It's time to start your day!",
        icon: "/icon-512x512.png",
      });
      break;
    case 10:
      self.registration.showNotification("Tidy bed 🛏️", {
        body: "Make your bed and tidy your room!",
        icon: "/icon-512x512.png",
      });
      break;
    case 12:
      self.registration.showNotification("Have a healthy meal 🍱", {
        body: "It's time to eat!",
        icon: "/icon-512x512.png",
      });
      break;
    case 13:
      self.registration.showNotification("Brush your teeth 🦷", {
        body: "It only takes 2 minutes!",
        icon: "/icon-512x512.png",
      });
      break;
    case 16:
      self.registration.showNotification("Time to exercise 🏃", {
        body: "It's time to exercise!",
        icon: "/icon-512x512.png",
      });
      break;
    case 17:
      self.registration.showNotification("Don't forget to drink 🫗", {
        body: "Keep hydrated!",
        icon: "/icon-512x512.png",
      });
      break;
    case 21:
      self.registration.showNotification("Time to relax 🧘", {
        body: "Meditation can help you relax",
        icon: "/icon-512x512.png",
      });
      break;
  }
};

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "Something Has Happened";
  const date = new Date();

  const hour = date.getHours();

  console.log("push happend");

  self.registration.showNotification("Default message 1", {
    body: "It's time to start your day!",
    icon: "/icon-512x512.png",
  });

  notificationByHour(hour);
});

self.addEventListener(
  "notificationclick",
  (event) => {
    // open a window to the app's homepage and close the notification
    console.log("event click");
    console.log(event);
    const data = event.data?.json() ?? {};
    console.log("event data");
    console.log(data);
    console.log("datatype2");
    console.log(event?.notification?.data);
    console.log("datatype3");
    console.log(event.notification.data?.json());
    console.log("datatype4");
    console.log(event.notification);
    event.waitUntil(clients.openWindow("https://habitai.io/home"));
    event.notification.close();
  },
  false
);

// hello world on install
self.addEventListener("install", (event) => {
  console.log("Hello/sw/public world from the Service Worker 2 🤙");
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
});

// hello world on activate
self.addEventListener("activate", (event) => {
  console.log("Hello/sw/public world from the Service Worker 1 🤙");
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
