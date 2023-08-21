self.addEventListener("message", (event) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log("Hello World, n2");
  console.log(event);
});

const TITLES = {
  GOOD_MORNING: "Are you awake? ☀️",
  TIDY_BED: "Tidy bed 🛏️",
  HEALTHY_MEAL: "Have a healthy meal 🍱",
  BRUSH_TEETH: "Brush your teeth 🦷",
  EXERCISE: "Time to exercise 🏃",
  DRINK: "Don't forget to drink 🫗",
  RELAX: "Time to relax 🧘",
};

const TITLE_TO_URL = {
  [TITLES.GOOD_MORNING]: "https://habitai.io/habit/wakeup/complete",
  [TITLES.TIDY_BED]: "https://habitai.io/habit/tidy/complete",
  [TITLES.HEALTHY_MEAL]: "https://habitai.io/habit/eat/complete",
  [TITLES.BRUSH_TEETH]: "https://habitai.io/habit/brush/complete",
  [TITLES.EXERCISE]: "https://habitai.io/habit/train/complete",
  [TITLES.DRINK]: "https://habitai.io/habit/drink/complete",
  [TITLES.RELAX]: "https://habitai.io/habit/meditate/complete",
};

const notificationByHour = (hour) => {
  switch (hour) {
    case 9:
      self.registration.showNotification(TITLES.GOOD_MORNING, {
        body: "It's time to start your day!",
        icon: "/icon-512x512.png",
      });
      break;
    case 10:
      self.registration.showNotification(TITLES.TIDY_BED, {
        body: "Make your bed and tidy your room!",
        icon: "/icon-512x512.png",
      });
      break;
    case 12:
      self.registration.showNotification(TITLES.HEALTHY_MEAL, {
        body: "It's time to eat!",
        icon: "/icon-512x512.png",
      });
      break;
    case 13:
      self.registration.showNotification(TITLES.BRUSH_TEETH, {
        body: "It only takes 2 minutes!",
        icon: "/icon-512x512.png",
      });
      break;
    case 16:
      self.registration.showNotification(TITLES.EXERCISE, {
        body: "It's time to exercise!",
        icon: "/icon-512x512.png",
      });
      break;
    case 17:
      self.registration.showNotification(TITLES.DRINK, {
        body: "Keep hydrated!",
        icon: "/icon-512x512.png",
      });
      break;
    case 21:
      self.registration.showNotification(TITLES.RELAX, {
        body: "Meditation can help you relax",
        icon: "/icon-512x512.png",
      });
      break;
  }
};

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const date = new Date();

  const hour = date.getHours();

  console.log("push happend");

  notificationByHour(hour);
});

self.addEventListener(
  "notificationclick",
  (event) => {
    // open a window to the app's homepage and close the notification

    const title = event.notification.title;

    const url = TITLE_TO_URL[title] || "https://habitai.io";

    event.waitUntil(clients.openWindow(url));
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
