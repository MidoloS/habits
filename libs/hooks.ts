import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";

export const useNotification = () => {
  const [permission, setPermission] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
    })();

    if ("serviceWorker" in navigator && "PushManager" in window) {
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
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      // Add the public key generated from the console here.
      getToken(messaging, {
        vapidKey:
          "BPq2545hDXGs4Gx2RqWw_dtokiqEQDjoG81YoUjV30j3wk5nZ9jwxK7_kj01Cwrm1h4tenvje8saelksUkVoSWs",
      })
        .then((currentToken) => {
          if (currentToken) {
            setPermission(true);
          } else {
            setPermission(false);
          }
        })
        .catch((err) => {
          console.log("error", err);
          setPermission(false);
        });
    }

    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager
        .getSubscription()
        .then((sub) => {
          if (sub) {
            setPermission(true);
            return sub;
          }

          setPermission(false);

          return reg.pushManager.subscribe({
            userVisibleOnly: true,
          });
        })
        .catch((err) => {
          setPermission(false);
        });
    });
  }, []);
  const requestPermission = () => {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          setPermission(true);
        } else {
          setPermission(false);
        }
      })
      .catch((err) => {
        console.log({ err });
        setPermission(false);
      });
  };
  return { requestPermission, permission };
};
