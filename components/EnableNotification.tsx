"use client";

import { useEffect, useState } from "react";
import { Switch } from "./Switch";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { createPortal } from "react-dom";

// import { requestPermission } from "@/firebase/helpers";

export const EnableNotification = () => {
  const [permission, setPermission] = useState(true);

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((a) => {
      console.log({ a });
      setPermission(a === "granted");

      if (a === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }

  useEffect(() => {
    console.log("useEffect");

    if ("serviceWorker" in navigator && "PushManager" in window) {
      (async () => {
        console.log("navigator", navigator);
        console.log("support", "serviceWorker" in navigator);

        const res = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        console.log("response");
        console.log(res);
      })();
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
      console.log({ messaging });
      // Add the public key generated from the console here.
      getToken(messaging, {
        vapidKey:
          "BPq2545hDXGs4Gx2RqWw_dtokiqEQDjoG81YoUjV30j3wk5nZ9jwxK7_kj01Cwrm1h4tenvje8saelksUkVoSWs",
      })
        .then((currentToken) => {
          console.log("currentToken: ", currentToken);
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
    }

    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((sub) => {
        console.log("sub", sub);

        if (sub) {
          return sub;
        }

        return reg.pushManager.subscribe({
          userVisibleOnly: true,
        });
      });
    });

    requestPermission();
  }, []);

  if (permission) {
    return null;
  }

  return createPortal(
    <div className="absolute top-0 left-0 bg-slate-950 bg-opacity-80 w-screen h-screen z-50 p-8 flex justify-center items-center">
      <div className="bg-slate-50 p-6 rounded-xl relative flex flex-col gap-4 max-w-md">
        <div>
          <p className="text-center text-slate-500 text-sm mb-2">
            Would you like to improve?
          </p>
          <h1 className="font-heading text-lg font-semibold text-center">
            Daily Reminder's
          </h1>
        </div>
        <p>
          People who turn on notifications are 60% more likely to compel their
          habits.
        </p>
      </div>
    </div>,
    document.body
  );
};
