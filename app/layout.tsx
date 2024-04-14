"use client";

import { Provider } from "@/components/Provider";
import "./globals.css";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { Analytics } from "@vercel/analytics/react";
import { getMessaging, getToken } from "firebase/messaging";
import { redirect, usePathname } from "next/navigation";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [permission, setPermission] = useState(true);
  const path = usePathname();
  const isLanding = path === "/" || path === "";
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches && isLanding) {
      redirect("/signin");
    }
    if (!isLanding) {
      (async () => {
        window.addEventListener("load", () => {
          if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/firebase-messaging-sw.js");
          }
        });
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
      }
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#020617" />
        <meta
          name="description"
          content="Rankers, Ditch the Grind & Build Real Habits with HabitAI!  Tired of missing workouts for that extra raid night? HabitAI uses AI & leaderboards to make sticking to goals FUN. Track habits, climb ranks, unlock rewards – it's a habit-building RPG! Download HabitAI & level up your life!"
        />
        <title>HabitAI ─ AI Powered Habit Formation</title>
      </head>
      <body style={{ background: "#18181b" }} className={roboto.className}>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
