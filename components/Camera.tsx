"use client";

import { useState } from "react";
import Webcam from "react-webcam";

import { getHighestValueKey } from "../libs/helpers";
import { SecondaryButton } from "./Button/Secondary";
import { PrimaryButton } from "./Button/Primary";

const swapCameraIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24.75"
    height="24.989"
    viewBox="0 0 24.75 24.989"
  >
    <g id="refresh_1_" data-name="refresh (1)" transform="translate(-2.461)">
      <path
        id="Path_20"
        data-name="Path 20"
        d="M5.555,11.124a9.377,9.377,0,0,1,15.373-5.76L19.72,6.573a1.038,1.038,0,0,0,.734,1.771h4.758a1.038,1.038,0,0,0,1.038-1.038V2.548a1.038,1.038,0,0,0-1.771-.734L23.129,3.163A12.477,12.477,0,0,0,2.482,10.671a1.554,1.554,0,1,0,3.073.453Z"
        transform="translate(0 0)"
        fill="#020617"
      />
      <path
        id="Path_21"
        data-name="Path 21"
        d="M44.471,256.891a1.572,1.572,0,0,0-1.542,1.37,9.377,9.377,0,0,1-15.373,5.76l1.209-1.209a1.038,1.038,0,0,0-.734-1.771H23.273a1.038,1.038,0,0,0-1.038,1.038v4.758a1.038,1.038,0,0,0,1.771.734l1.349-1.349A12.475,12.475,0,0,0,46,258.715a1.571,1.571,0,0,0-1.531-1.824Z"
        transform="translate(-18.812 -244.397)"
        fill="#020617"
      />
    </g>
  </svg>
);

export const Camera = () => {
  const [facing, setFacing] = useState("environment");
  const [habitName, setHabitName] = useState<string | null>(null);

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
        height={1100}
        mirrored={facing === "user"}
        screenshotFormat="image/png"
        width={500}
        imageSmoothing={true}
        forceScreenshotSourceSize={true}
        onUserMedia={() => console.log("User media loaded")}
        onUserMediaError={() => console.log("User media error")}
        screenshotQuality={1}
        videoConstraints={{
          facingMode: facing,
        }}
        className="rounded-xl"
      >
        {/* @ts-ignore */}
        {({ getScreenshot }) => (
          <div className="flex items-center gap-6">
            <PrimaryButton
              onClick={() => {
                setHabitName(null);
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
                    setHabitName(getHighestValueKey(result));
                  })
                  .catch((error) => console.log("error", error));
              }}
            >
              Capture photo
            </PrimaryButton>
            <button onClick={handleFace}>{swapCameraIcon}</button>
          </div>
        )}
      </Webcam>
    </>
  );
};
