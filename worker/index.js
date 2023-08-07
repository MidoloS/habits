"use strict";

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//
// self.__WB_DISABLE_DEV_LOGS = true

// listen to message event from window
self.addEventListener("message", (event) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log("Hello World");
});

self.addEventListener("push", (event) => {
  console.log("push/worker", event);
});

// hello world on install
self.addEventListener("install", (event) => {
  console.log("Hello/worker world from the Service Worker 2 🤙");
});

// hello world on activate
self.addEventListener("activate", (event) => {
  console.log("Hello/worker world from the Service Worker 1 🤙");
});
