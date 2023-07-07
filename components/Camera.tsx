"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

export const Camera = () => {
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const searchParams = useSearchParams();
  const urlFacing = searchParams?.get("facing") || "environment";
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

  useEffect(() => {
    if (urlFacing === "user" || urlFacing === "environment") {
      setFacing(urlFacing);
    }
  }, [urlFacing]);

  return (
    <>
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
    </>
  );
};
