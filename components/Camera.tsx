"use client";

import { useState } from "react";
import Webcam from "react-webcam";

import { getHighestValueKey } from "../libs/helpers";
import { SecondaryButton } from "./Button/Secondary";
import { PrimaryButton } from "./Button/Primary";

const TakenToast = ({ name }: { name: string }) => (
  <div
    id="toast-undo"
    className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
    role="alert"
  >
    <div className="text-sm font-normal">
      Habit completed {name.toUpperCase()}
    </div>
    <div className="flex items-center ml-auto space-x-2">
      <button
        type="button"
        className="bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-undo"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
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
        height={1000}
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
        )}
      </Webcam>
      <SecondaryButton onClick={handleFace}>Switch camera</SecondaryButton>
      {habitName && <TakenToast name={habitName} />}
    </>
  );
};
