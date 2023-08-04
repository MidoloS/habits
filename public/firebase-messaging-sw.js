// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
