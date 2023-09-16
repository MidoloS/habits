"use client";

import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { createPortal } from "react-dom";
import { PrimaryButton } from "../Button/Primary";

export const EnableNotification = () => {
  const [permission, setPermission] = useState(true);

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
            // Show permission request UI
            setPermission(false);

            // ...
          }
        })
        .catch((err) => {
          setPermission(false);
          // ...
        });
    }

    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((sub) => {
        if (sub) {
          return sub;
        }

        return reg.pushManager.subscribe({
          userVisibleOnly: true,
        });
      });
    });
  }, []);

  if (permission) {
    return null;
  }

  function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setPermission(true);
      }
    });
  }

  const handleClose = () => {
    setPermission(true);
  };

  return createPortal(
    <div className="absolute top-0 left-0 bg-slate-950 bg-opacity-80 w-screen h-screen z-50 p-10 flex justify-center items-center">
      <div className="bg-slate-50 p-8 rounded-xl relative flex flex-col gap-4 max-w-xs items-center">
        <div>
          <p className="text-center text-slate-500 text-sm mb-2">
            Wanna improve your habits?
          </p>
          <h1 className="font-heading text-lg font-bold text-center">
            Enable Daily Reminder
          </h1>
        </div>
        <p className="text-center text-sm">
          People who turn on notifications are{" "}
          <span className="font-semibold ">
            60% more likely to compel their habits.
          </span>
        </p>
        <div className="flex justify-center flex-col gap-2">
          <PrimaryButton onClick={requestPermission} size="lg">
            Enable daily remainder
          </PrimaryButton>
          <button onClick={handleClose} className="text-slate-500 text-sm pt-2">
            Maybe later
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
