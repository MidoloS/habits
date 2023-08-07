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
  const app = firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  console.log("messaging", messaging);

  // messaging
  //   .getToken(messaging, {
  //     vapidKey:
  //       "BPq2545hDXGs4Gx2RqWw_dtokiqEQDjoG81YoUjV30j3wk5nZ9jwxK7_kj01Cwrm1h4tenvje8saelksUkVoSWs",
  //   })
  //   .then((currentToken) => {
  //     if (currentToken) {
  //       console.log("TOKEN: " + currentToken);
  //     } else {
  //       // Show permission request UI
  //       console.log(
  //         "No registration token available. Request permission to generate one."
  //       );
  //       // ...
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("An error occurred while retrieving token. ", err);
  //     // ...
  //   });

  messaging.onBackgroundMessage(messaging, (payload) => {
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
    const option = { body: payload.data.status };
    return self.registration.showNotification(title, option);
  });
}
