"use client";

import { Provider } from "@/components/Provider";
import "./globals.css";
import Script from "next/script";
import { Inter, Montserrat } from "next/font/google";
import { useEffect } from "react";

// export const metadata = {
//   title: "habitai.io",
// };

const inter = Inter({ subsets: ["latin"] });

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.addEventListener("load", () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/firebase-messaging-sw.js");
        navigator.serviceWorker.register("/OneSignalSDKWorker.js").then((a) => {
          console.log("restier one signal", a);
        });
      }
    });
    // @ts-ignore
    window.OneSignal = window.OneSignal || [];
    // @ts-ignore
    OneSignal.push(function () {
      // @ts-ignore
      OneSignal.init({
        appId: "352fe6f6-53ed-41d6-b473-f42db3f87628",
        notifyButton: {
          enable: true,
        },

        allowLocalhostAsSecureOrigin: true,
      });
    });
    navigator.serviceWorker.register("/OneSignalSDKWorker.js").then((a) => {
      console.log("restier one signal wwwwww", a);
    });

    return () => {
      // @ts-ignore
      window.OneSignal = undefined;
    };
  }, []);

  console.log(1);

  console.log("nueva layour con el script");

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#020617" />
        <title>habitai.io</title>
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
        <Script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async
        ></Script>
      </head>

      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
