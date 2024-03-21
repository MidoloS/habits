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
          content="HabitAI is a cutting-edge app that supercharges your journey to healthier habits through friendly competition. Turn your wellness goals into an exhilarating personal challenge by facing off against fellow users in the pursuit of a healthier life. Discover how HabitAI can transform your daily routine and drive you towards your goals with excitement and motivation!"
        />
        <title>HabitAI ─ Create habits healthy using AI</title>
      </head>
      <body className={roboto.className}>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
