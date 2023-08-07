"use client";

import { useEffect, useState } from "react";
import { Switch } from "./Switch";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// import { requestPermission } from "@/firebase/helpers";

export const EnableNotification = () => {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    console.log("useEffect");

    (async () => {
      console.log("navigator", navigator);
      console.log("support", "serviceWorker" in navigator);

      const res = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log("response");
      console.log(res);
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

    window.addEventListener("load", () => {
      if ("serviceWorker" in navigator) {
      }
    });
    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((sub) => {
        console.log("sub", sub);

        if (sub === null) {
          // Update UI to ask user to register for Push
          console.log("Not subscribed to push service!");
        } else {
          // We have a subscription, update the database
          console.log("Subscription object: ", sub);
        }
      });
    });
  }, []);

  if (permission) {
    return null;
  }

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      console.log({ permission });

      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }

  return (
    <div className="absolute">
      <div className="bg-slate-950 flex justify-between items-center p-4 rounded-lg w-screen">
        <div className="flex flex-col gap-1">
          <h3 className="text-slate-50 font-medium">
            Wanna improve your habits?
          </h3>
          <p className="text-slate-300 text-sm">Enable Daily Reminder</p>
        </div>
        <div>
          <Switch onClick={requestPermission} />
        </div>
      </div>
    </div>
  );
};
