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
import toast, { Toaster } from "react-hot-toast";
import { SwapCamera } from "./SwapButton";

export const Camera = ({ habitName }: { habitName: string }) => {
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionWithHabit>(
    {} as SubscriptionWithHabit
  );
  const { push } = useRouter();

  const searchParams = useSearchParams();
  const urlFacing = searchParams?.get("facing") || "environment";
  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    if (habitName === "wakeup") {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 5 && hours <= 9) {
        await completeHabit(habitName);
        navigator.serviceWorker.ready.then((registration) => {
          if (!registration.active) return;

          registration.active.postMessage(
            JSON.stringify({
              completed: true,
              name: "wakeup",
            })
          );
        });
        push(`/habit/${habitName}/congratulations`);
      } else {
        toast.error("You need to wake up between 5am and 9am");
        const failure = new Audio("/failure.mp3");
        failure.play();
      }
      return;
    }
    if (["meditate", "read"].includes(habitName)) {
      push(`/habit/${habitName}/congratulations`);
      await completeHabit(habitName);
      navigator.serviceWorker.ready.then((registration) => {
        if (!registration.active) return;

        registration.active.postMessage(
          JSON.stringify({
            completed: true,
            name: habitName,
            isFollowing: true,
          })
        );
      });
      return;
    }

    setIsLoading(true);

    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();

    const b64img = imageSrc.replace(/^.*?base64,/, "");

    const res = await fetch("/validateHabit", {
      method: "POST",
      body: b64img,
    });

    const data = await res.json();

    const mostLikely = getKeyWithMaxValue(data);

    setIsLoading(false);

    // @ts-ignore
    if (API_TO_HABIT_NAME[mostLikely] === habitName) {
      await completeHabit(habitName);
      navigator.serviceWorker.ready.then((registration) => {
        if (!registration.active) return;

        registration.active.postMessage(
          JSON.stringify({
            completed: true,
            name: habitName,
            isFollowing: true,
          })
        );
      });
      push(`/habit/${habitName}/congratulations`);
    } else {
      const failure = new Audio("/failure.mp3");
      toast.error("Please try again");
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
      setSubscription(res.data);
    })();
  }, []);

  const text = subscription.completedAt ? "Already done" : "Complete Task";

  return (
    <>
      <Toaster />
      <div className="w-full -z-10 absolute top-0 h-full left-0 ">
        <Webcam
          audio={false}
          height={669}
          mirrored={facing === "user"}
          screenshotFormat="image/png"
          width={430}
          ref={webcamRef}
          imageSmoothing={true}
          screenshotQuality={1}
          videoConstraints={{
            facingMode: facing,
            width: { min: 430 },
            height: { min: 669 },
            aspectRatio: 1.5,
          }}
        />
      </div>
      <div className="flex gap-4">
        <PrimaryButton
          isLoading={isLoading}
          onClick={capture}
          disabled={!!subscription.completedAt}
          isActive
        >
          {isLoading ? "Processing..." : text}
        </PrimaryButton>
        <SwapCamera />
      </div>
    </>
  );
};
