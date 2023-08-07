"use client";

import { useEffect, useState } from "react";
import { Switch } from "./Switch";
// import { requestPermission } from "@/firebase/helpers";

export const EnableNotification = () => {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/firebase-messaging-sw.js");
      }
    });
    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((sub) => {
        if (!sub) {
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
