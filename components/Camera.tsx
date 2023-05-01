"use client";

import Webcam from "react-webcam";
export const Camera = () => (
  <Webcam
    audio={false}
    height={720}
    screenshotFormat="image/jpeg"
    width={1280}
    imageSmoothing={true}
    forceScreenshotSourceSize={true}
    mirrored={true}
    onUserMedia={() => console.log("User media loaded")}
    onUserMediaError={() => console.log("User media error")}
    screenshotQuality={1}
  >
    {/* @ts-ignore */}
    {({ getScreenshot }) => (
      <button
        onClick={() => {
          const base64 = getScreenshot();

          if (!base64) {
            return;
          }
          fetch("https://bcd9-190-49-1-250.ngrok.io", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64.slice(22) }),
            redirect: "follow",
          })
            .then((response) => {
              console.log("response", response);
              return response.json();
            })
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        }}
      >
        Capture photo
      </button>
    )}
  </Webcam>
);
