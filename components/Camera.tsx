"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { PrimaryButton } from "./Button/Primary";

export const Camera = () => {
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const searchParams = useSearchParams();
  const urlFacing = searchParams?.get("facing") || "environment";
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();

    const b64img = imageSrc.replace(/^.*?base64,/, "");

    console.log("imageSrc", imageSrc);

    fetch(
      "https://wmoy6ravk5hlbzhskyaotl3bei0gfmeb.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        body: b64img,
      }
    ).then((res) => res.json().then((res) => console.log("res", res)));
  }, [webcamRef]);

  useEffect(() => {
    if (urlFacing === "user" || urlFacing === "environment") {
      setFacing(urlFacing);
    }
  }, [urlFacing]);

  return (
    <>
      <div className="w-full -z-10 absolute top-0 left-0">
        <Webcam
          audio={false}
          height={669}
          mirrored={facing === "user"}
          screenshotFormat="image/png"
          width={430}
          ref={webcamRef}
          imageSmoothing={true}
          onUserMedia={() => console.log("User media loaded")}
          onUserMediaError={() => console.log("User media error")}
          screenshotQuality={1}
          videoConstraints={{
            facingMode: facing,
            width: { min: 430 },
            height: { min: 669 },
            aspectRatio: 1.5,
          }}
        />
      </div>
      <PrimaryButton onClick={capture}>Take picture</PrimaryButton>
    </>
  );
};
