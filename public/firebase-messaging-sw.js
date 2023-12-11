importScripts("https://unpkg.com/idb@4.0.3/build/iife/index-min.js");

const ENABLE_DEV_MESSAGE = false;

const getItemFromDBSW = (storeName) => async (key) => {
  console.log({ key, storeName });

  const dbPromise = idb.openDB("habitai", 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
  const valueFromDB = await (await dbPromise).get(storeName, key);

  console.log("getItemFromDBSW", { valueFromDB });

  if (valueFromDB?.name) {
    return {};
  }

  if (!valueFromDB) {
    return {};
  }

  return JSON.parse(valueFromDB);
};

const setItemInDBSW = (storeName) => async (key, val) => {
  const dbPromise = idb.openDB("habitai", 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
  const prevData = await getItemFromDBSW("habits")(key);

  console.log("setItemInDBSW", prevData, val);

  const newData = {
    ...prevData,
    ...(typeof val === "string" ? JSON.parse(val) : val),
  };

  console.log(123);
  console.log({ newData });
  console.log("string", JSON.stringify(newData));

  return await (await dbPromise).put(storeName, JSON.stringify(newData), key);
};

const isFollowingSW = async (habitName) => {
  try {
    const data = await getItemFromDBSW("habits")(habitName);

    console.log("isFollowing");
    console.log({ data });

    return !!data?.isFollowing;
  } catch (error) {
    return false;
  }
};

const isCompletedSW = async (habitName) => {
  try {
    const data = await getItemFromDBSW("habits")(habitName);

    console.log("isCompleted");
    console.log({ data });

    return !!data?.completed;
  } catch (error) {
    return false;
  }
};

const hasSentSW = async (habitName) => {
  try {
    const data = await getItemFromDBSW("habits")(habitName);

    console.log("isCompleted");
    console.log({ data });

    return !!data?.hasSent;
  } catch (error) {
    return false;
  }
};

const shouldSendNotification = async (habitName) => {
  const follow = await isFollowingSW(habitName);
  const completed = await isCompletedSW(habitName);
  const hasSent = await hasSentSW(habitName);

  devMessage(ENABLE_DEV_MESSAGE)({ habitName, follow, completed });

  console.log({ follow, completed });

  return follow && !completed && !hasSent;
};

const devMessage = (debug) => (text) => {
  if (!debug) {
    return;
  }
  self.registration.showNotification("DEV DEBUGGER", {
    body: JSON.stringify(text),
  });
};

const getAllHabitsOnDB = async () => {
  let data = [];
  const habits = [
    "meditate",
    "walk",
    "eat",
    "read",
    "wakeup",
    "tidy",
    "train",
    "drink",
    "laundry",
    "brush",
  ];
  for (habit of habits) {
    const newData = await getItemFromDBSW("habits")(habit);
    data.push(newData);
  }
  return data;
};

self.addEventListener("message", async (event) => {
  console.log("post event");
  const data = JSON.parse(event?.data || {});
  devMessage(ENABLE_DEV_MESSAGE)({ all: await getAllHabitsOnDB() });
  await setItemInDBSW("habits")(data.name, event.data);
  const wea = await getItemFromDBSW("habits")(data.name);
  console.log({ wea });
  console.log("send noti?", await shouldSendNotification(data.name));
});

const clearHabits = async () => {
  console.log("clear habits");
  const habits = [
    "meditate",
    "walk",
    "eat",
    "read",
    "wakeup",
    "tidy",
    "train",
    "drink",
    "laundry",
    "brush",
  ];

  for (habit of habits) {
    await setItemInDBSW("habits")(habit, { name: habit, completed: false, hasSent: false });
  }
};

const TITLES_TO_NAME = {
  "Are you Awake? ☀️": "wakeup",
  "Make the Bed 🛏️": "tidy",
  "Laundry Time! 👕": "laundry",
  "Eat Fruit 🍎": "eat",
  "Brush Teeth 😁": "brush",
  "Touch grass 🌳": "walk",
  "Drink Water 🥤": "drink",
  "Time to relax 🧘": "meditate",
  "Read 5 pages 📖": "read",
};
const notificationByHour = async (hour) => {
  devMessage(ENABLE_DEV_MESSAGE)({ notificationByHour: true, hour });
  if (hour >= 6 && hour <= 9) {
    devMessage(ENABLE_DEV_MESSAGE)({ notiTidy: await shouldSendNotification("tidy") });
    if (await shouldSendNotification("tidy")) {
      self.registration.showNotification("Make the Bed 🛏️", {
        body: "5 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
      setItemInDBSW("tidy", {
        hasSent: true
      })
    }
    devMessage(ENABLE_DEV_MESSAGE)({
      notiLaundry: await shouldSendNotification("laundry"),
    });
    if (await shouldSendNotification("laundry")) {
      self.registration.showNotification("Laundry Time! 👕", {
        body: "5 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
      setItemInDBSW("laundry", {
        hasSent: true
      })
    }
    if (await shouldSendNotification("wakeup")) {
      self.registration.showNotification("Are you Awake? ☀️", {
        body: "Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
      setItemInDBSW("wakeup", {
        hasSent: true
      })
    }
    return;
  }
  if (hour >= 12 && hour <= 15) {
    devMessage(ENABLE_DEV_MESSAGE)({
      notiEat: await shouldSendNotification("eat"),
    });
    if (await shouldSendNotification("eat")) {
      self.registration.showNotification("Eat Fruit 🍎", {
        body: "3 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
      setItemInDBSW("eat", {
        hasSent: true
      })
    }
    devMessage(ENABLE_DEV_MESSAGE)({
      notiBrush: await shouldSendNotification("brush"),
    });
    if (await shouldSendNotification("brush")) {
      self.registration.showNotification("Brush Teeth 😁", {
        body: "2 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
      setItemInDBSW("brush", {
        hasSent: true
      })
    }
    if (await shouldSendNotification("drink")) {
      self.registration.showNotification("Drink Water 🥤", {
        body: "2 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
      setItemInDBSW("drink", {
        hasSent: true
      })
    }
    return;
  }
  if (hour >= 16 && hour <= 19) {
    devMessage(ENABLE_DEV_MESSAGE)({
      notiWalk: await shouldSendNotification("walk"),
    });
    if (await shouldSendNotification("walk")) {
      self.registration.showNotification("Touch grass 🌳", {
        body: "15 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
      setItemInDBSW("walk", {
        hasSent: true
      })
    }
    return;
  }
  if (hour >= 20 && hour <= 23) {
    const notiRead = await shouldSendNotification("read");
    devMessage(ENABLE_DEV_MESSAGE)({
      notiRead1: notiRead,
    });
    if (await shouldSendNotification("drink")) {
      self.registration.showNotification("Drink Water 🥤", {
        body: "2 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
      setItemInDBSW("drink", {
        hasSent: true
      })
    }
    if (await shouldSendNotification("read")) {
      self.registration.showNotification("Read 5 pages 📖", {
        body: "20 min. Click here to complete.",
        badge: "/badge.png",
        icon: "/pixel.png",
      });
      setItemInDBSW("read", {
        hasSent: true
      })
    }
    return;
  }
  await clearHabits();
  return;
};

self.addEventListener("push", (event) => {
  const date = new Date();

  const hour = date.getHours();

  notificationByHour(hour);
});

self.addEventListener(
  "notificationclick",
  (event) => {
    const title = event.notification.title;
    
    const url = `https://www.habitai.io/habit/${TITLES_TO_NAME[title]}/complete`

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
