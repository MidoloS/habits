"use client";

import JSConfetti from "js-confetti";
import { useEffect } from "react";

export const Confetti = () => {
  useEffect(() => {
    const success = new Audio("/success.mp3");
    success.play();

    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiNumber: 300,
    });
  }, []);

  return <></>;
};
