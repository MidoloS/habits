"use client";

export const DebugButton = () => {
  const handleDevMessage = () => {
    navigator.serviceWorker.ready.then((registration) => {
      if (!registration.active) return;

      registration.active.postMessage(
        JSON.stringify({
          debug: true,
          name: "tidy",
        })
      );
    });
  };
  return <button onClick={handleDevMessage}>Debug</button>;
};
