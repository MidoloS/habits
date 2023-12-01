"use client";

import { Provider } from "@/components/Provider";
import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";

const inter = Inter({ subsets: ["latin"] });

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", function (event) {
        // Receive the message from the service worker
        console.log(event); // {data: 'Hello from the service worker!'}
        alert(event);
      });
      navigator.serviceWorker.register("/firebase-messaging-sw.js");
      window.addEventListener("load", () => {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.register("/firebase-messaging-sw.js");
        }
      });
      navigator.serviceWorker.register("/firebase-messaging-sw.js");
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
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#020617" />
        <meta
          name="description"
          content="HabitAI is a cutting-edge app that supercharges your journey to healthier habits through friendly competition. Turn your wellness goals into an exhilarating personal challenge by facing off against fellow users in the pursuit of a healthier life. Discover how HabitAI can transform your daily routine and drive you towards your goals with excitement and motivation!"
        />
        <title>HabitAI</title>
        <Script
          id="hothatAnalytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3589171,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
