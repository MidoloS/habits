importScripts("https://unpkg.com/idb@4.0.3/build/iife/index-min.js");

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const getItemFromDB = (storeName) => async (key) => {
  console.log({ key, storeName });

  if (!key) {
    return null;
  }

  const dbPromise = idb.openDB("habitai", 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
  const valueFromDB = await (await dbPromise).get(storeName, key);

  if (isJson(valueFromDB)) {
    return JSON.parse(valueFromDB);
  }

  return valueFromDB;
};

const deleteItemFromDB = (storeName) => async (key) => {
  const dbPromise = idb.openDB("habitai", 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
  return (await dbPromise).delete(storeName, key);
};

const setItemInDB = (storeName) => async (key, val) => {
  const dbPromise = idb.openDB("habitai", 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
  await deleteItemFromDB("habits")(key);
  return await (await dbPromise).put(storeName, val, key);
};

const isFollowing = async (habitName) => {
  try {
    const res = await getItemFromDB("habits")(habitName);

    const data = isJson(res) ? JSON.parse(res) : res;

    console.log("isFollowing");
    console.log({ data });

    if (data.type === "FOLLOW_HABIT") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

self.addEventListener("message", async (event) => {
  console.log({ event });
  console.log("wea");
  const data = JSON.parse(event?.data || {});
  console.log({ data });
  console.log("recieved button");
  await setItemInDB("habits")(data.name, event.data);

  const wea = await getItemFromDB("habits")(data.name);

  console.log({ wea });

  const follow = await isFollowing(data.name);

  console.log({ follow });
});

const TITLES = {
  GOOD_MORNING: "Good Morning! ☀️",
  TIDY_BED: "Make the Bed 🛏️",
  LAUNDRY: "Laundry Time! 👕",
  HEALTHY_MEAL: "Eat Fruit 🍎",
  BRUSH_TEETH: "Brush Teeth 😁",
  WALK: "Touch grass 🌳",
  DRINK: "Drink Water 🌊",
  RELAX: "Time to relax 🧘",
  READ: "Read 5 pages 📖",
};

const TITLE_TO_URL = {
  [TITLES.GOOD_MORNING]: "https://habitai.io/habit/wakeup/complete",
  [TITLES.TIDY_BED]: "https://habitai.io/habit/tidy/complete",
  [TITLES.LAUNDRY]: "https://habitai.io/habit/laundry/complete",
  [TITLES.HEALTHY_MEAL]: "https://habitai.io/habit/eat/complete",
  [TITLES.BRUSH_TEETH]: "https://habitai.io/habit/brush/complete",
  [TITLES.WALK]: "https://habitai.io/habit/walk/complete",
  [TITLES.DRINK]: "https://habitai.io/habit/drink/complete",
  [TITLES.RELAX]: "https://habitai.io/habit/meditate/complete",
  [TITLES.READ]: "https://habitai.io/habit/read/complete",
};

const notificationByHour = async (hour) => {
  if (hour >= 7 && hour <= 9) {
    if (await isFollowing("tidy")) {
      self.registration.showNotification(TITLES.TIDY_BED, {
        body: "5 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
    }

    if (await isFollowing("laundry")) {
      self.registration.showNotification(TITLES.LAUNDRY, {
        body: "5 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
    }
  }
  if (hour >= 12 && hour <= 14) {
    if (await isFollowing("eat")) {
      self.registration.showNotification(TITLES.HEALTHY_MEAL, {
        body: "3 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
    }
    if (await isFollowing("brush")) {
      self.registration.showNotification(TITLES.BRUSH_TEETH, {
        body: "2 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
    }
  }
  if (hour >= 15 && hour <= 18) {
    if (await isFollowing("walk")) {
      self.registration.showNotification(TITLES.WALK, {
        body: "15 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
    }
  }
  if (hour >= 19 && hour <= 21) {
    if (await isFollowing("read")) {
      self.registration.showNotification(TITLES.READ, {
        body: "20 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
    }
  }
};

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const date = new Date();

  const hour = date.getHours();

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
  importScripts(
    "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
  );

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

  messaging.onMessage(messaging, (payload) => {
    // ...
  });

  messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
});

// hello world on activate
self.addEventListener("activate", (event) => {
  importScripts(
    "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
  );

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

  messaging.onMessage(messaging, (payload) => {
    // ...
  });

  messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
});

if ("serviceWorker" in navigator) {
  importScripts(
    "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
  );

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

  messaging.onMessage(messaging, (payload) => {
    // ...
  });

  messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
