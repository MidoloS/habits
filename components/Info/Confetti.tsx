"use client";

import JSConfetti from "js-confetti";
import { FC, useEffect } from "react";

type Props = {
  msDelay?: number;
};

export const Confetti: FC<Props> = ({ msDelay = 0 }) => {
  useEffect(() => {
    const success = new Audio("/success.mp3");
    success.play();

    setTimeout(() => {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        confettiNumber: 300,
        confettiColors: ["#FCA5A5", "#FCD34D", "#FCD34D", "#FCD34D", "#FCD34D"],
      });
    }, msDelay);
  }, []);

  return <></>;
};
