"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";

export const Camera = () => {
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const searchParams = useSearchParams();
  const urlFacing = searchParams?.get("facing") || "environment";

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
      >
        {/* @ts-ignore */}
        {({ getScreenshot }) => (
          <div className="flex items-center gap-6">
            {/* <PrimaryButton
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
                  })
                  .catch((error) => console.log("error", error));
              }}
            >
              Capture photo
            </PrimaryButton> */}
          </div>
        )}
      </Webcam>
    </>
  );
};
