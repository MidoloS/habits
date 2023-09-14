"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { PrimaryButton } from "../Button/Primary";
import {
  completeHabit,
  getKeyWithMaxValue,
  getSubscription,
} from "@/libs/helpers";
import { SubscriptionWithHabit } from "@/libs/types";
import { API_TO_HABIT_NAME } from "@/libs/constants";
import { HabitCompleteLoading } from "../HabitCompleteLoading";

export const Camera = ({ habitName }: { habitName: string }) => {
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionWithHabit>(
    {} as SubscriptionWithHabit
  );
  const { push } = useRouter();

  console.log({ habitName });

  const searchParams = useSearchParams();
  const urlFacing = searchParams?.get("facing") || "environment";
  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    if (habitName === "wakeup") {
      const now = new Date();
      const hours = now.getHours();

      console.log({ hours });

      if (hours >= 5 && hours <= 9) {
        await completeHabit(habitName);
        push(`/home?completed=${habitName}`);
      } else {
        const failure = new Audio("/failure.mp3");
        failure.play();
      }
      return;
    }
    if (["meditate", "read"].includes(habitName)) {
      push(`/home?completed=${habitName}`);
      await completeHabit(habitName);
      return;
    }

    setIsLoading(true);

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

    setIsLoading(false);

    // @ts-ignore
    if (API_TO_HABIT_NAME[mostLikely] === habitName) {
      console.log("Habit completed");
      await completeHabit(habitName);
      push(`/home?completed=${habitName}`);
    } else {
      const failure = new Audio("/failure.mp3");
      failure.play();
      setIsLoading(false);
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

  const text = subscription.completedAt ? "Already done" : "Complete";

  console.log({ subscription });

  return (
    <>
      {isLoading && <HabitCompleteLoading />}
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
      <PrimaryButton
        isLoading={isLoading}
        onClick={capture}
        disabled={!!subscription.completedAt}
      >
        {text}
      </PrimaryButton>
    </>
  );
};
