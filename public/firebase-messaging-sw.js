importScripts("https://unpkg.com/idb@4.0.3/build/iife/index-min.js");

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

const shouldSendNotification = async (habitName) => {
  const follow = await isFollowingSW(habitName);
  const completed = await isCompletedSW(habitName);

  devMessage(true)({ habitName, follow, completed });

  console.log({ follow, completed });

  return follow && !completed;
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
  devMessage(data.debug)({ all: await getAllHabitsOnDB() });
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
    await setItemInDBSW("habits")(habit, { name: habit, completed: false });
  }
};

const notificationByHour = async (hour) => {
  devMessage(true)({ notificationByHour: true, hour });
  if (hour >= 7 && hour <= 11) {
    devMessage(true)({ notiTidy: await shouldSendNotification("tidy") });
    if (await shouldSendNotification("tidy")) {
      self.registration.showNotification(TITLES.TIDY_BED, {
        body: "5 min. Click here to complete.",
      });
    }
    devMessage(true)({
      notiLaundry: await shouldSendNotification("laundry"),
    });
    if (await shouldSendNotification("laundry")) {
      self.registration.showNotification(TITLES.LAUNDRY, {
        body: "5 min. Click here to complete.",
      });
    }
    return;
  }
  if (hour >= 12 && hour <= 14) {
    devMessage(true)({
      notiEat: await shouldSendNotification("eat"),
    });
    if (await shouldSendNotification("eat")) {
      self.registration.showNotification(TITLES.HEALTHY_MEAL, {
        body: "3 min. Click here to complete.",
      });
    }
    devMessage(true)({
      notiBrush: await shouldSendNotification("brush"),
    });
    if (await shouldSendNotification("brush")) {
      self.registration.showNotification(TITLES.BRUSH_TEETH, {
        body: "2 min. Click here to complete.",
      });
    }
    return;
  }
  if (hour >= 15 && hour <= 18) {
    devMessage(true)({
      notiWalk: await shouldSendNotification("walk"),
    });
    if (await shouldSendNotification("walk")) {
      self.registration.showNotification(TITLES.WALK, {
        body: "15 min. Click here to complete.",
      });
    }
    return;
  }
  if (hour >= 19 && hour <= 22) {
    devMessage(true)({
      notiRead: await shouldSendNotification("read"),
    });
    if (await shouldSendNotification("read")) {
      self.registration.showNotification(TITLES.READ, {
        body: "20 min. Click here to complete.",
      });
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
