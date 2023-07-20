"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { PrimaryButton } from "./Button/Primary";
import { completeHabit, getSubscription } from "@/libs/helpers";
import { SubscriptionWithHabit } from "@/libs/types";
import { API_TO_HABIT_NAME } from "@/libs/constants";

// @ts-ignore
function getKeyWithMaxValue(obj) {
  // Encontrar el valor máximo en el objeto
  // @ts-ignore
  const maxVal = Math.max(...Object.values(obj));

  // Iterar sobre el objeto para encontrar la clave asociada al valor máximo
  for (const [key, value] of Object.entries(obj)) {
    if (value === maxVal) {
      return key;
    }
  }

  // Si no se encuentra la clave, puedes lanzar una excepción o devolver null, según lo que necesites.
  return null;
}

export const Camera = ({ habitName }: { habitName: string }) => {
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const [subscription, setSubscription] = useState<SubscriptionWithHabit>(
    {} as SubscriptionWithHabit
  );
  const { push } = useRouter();

  const searchParams = useSearchParams();
  const urlFacing = searchParams?.get("facing") || "environment";
  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();

    const b64img = imageSrc.replace(/^.*?base64,/, "");

    console.log("imageSrc", imageSrc);

    const res = await fetch(
      "https://wmoy6ravk5hlbzhskyaotl3bei0gfmeb.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        body: b64img,
      }
    );

    const data = await res.json();

    const mostLikely = getKeyWithMaxValue(data);

    console.log({ data });

    console.log({ mostLikely, habitName });

    // @ts-ignore
    console.log({ toKey: API_TO_HABIT_NAME[mostLikely] });

    // @ts-ignore
    if (API_TO_HABIT_NAME[mostLikely] === habitName) {
      console.log("Habit completed");
      const audio = new Audio("/success.mp3");
      audio.play();
      await completeHabit(habitName);
      push("/home?completed=1");
    }
  }, [webcamRef]);

  useEffect(() => {
    if (urlFacing === "user" || urlFacing === "environment") {
      setFacing(urlFacing);
    }
  }, [urlFacing]);

  useEffect(() => {
    (async () => {
      const res = await getSubscription(habitName);
      console.log({ res });
      setSubscription(res.data);
    })();
  }, []);

  const text = subscription.completedAt ? "Already done" : "Take picture";

  console.log({ subscription });

  return (
    <>
      <div className="w-full -z-10 absolute top-0 h-full left-0 ">
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
      <PrimaryButton onClick={capture} disabled={!!subscription.completedAt}>
        {text}
      </PrimaryButton>
    </>
  );
};
