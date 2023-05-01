"use client";

import { useState } from "react";
import Webcam from "react-webcam";

import { getHighestValueKey } from "../libs/helpers";

export const Camera = () => {
  const [facing, setFacing] = useState("environment");
  const [taken, setTaken] = useState(false);

  const handleFace = () => {
    if (facing === "user") {
      setFacing("environment");
    } else {
      setFacing("user");
    }
  };

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        mirrored={facing === "user"}
        // @ts-ignore
        screenshotFormat="image/png"
        width={1280}
        imageSmoothing={true}
        forceScreenshotSourceSize={true}
        onUserMedia={() => console.log("User media loaded")}
        onUserMediaError={() => console.log("User media error")}
        screenshotQuality={1}
        videoConstraints={{
          facingMode: facing,
          frameRate: { ideal: taken ? 0 : 60, max: taken ? 0 : 60 },
        }}
      >
        {/* @ts-ignore */}
        {({ getScreenshot }) => (
          <button
            onClick={() => {
              const base64 = getScreenshot();

              if (!base64) {
                return;
              }
              fetch("https://557a-190-49-1-250.ngrok.io", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: base64.slice(22) }),
                redirect: "follow",
              })
                .then((response) => {
                  return response.json();
                })
                .then((result) => {
                  console.log(result);
                  alert(getHighestValueKey(result));
                })
                .catch((error) => console.log("error", error));
            }}
          >
            Capture photo
          </button>
        )}
      </Webcam>
      <button onClick={handleFace}>Switch camera</button>
    </>
  );
};
