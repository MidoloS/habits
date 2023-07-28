"use client";

import { currentDateWithTimezone } from "@/libs/helpers";
import { useEffect, useState } from "react";

function timeUntil12UTC() {
  const nowTimestamp = Date.now();
  const twelveUTC = new Date();
  twelveUTC.setUTCHours(24, 0, 0, 0);
  const twelveUTCTimestamp = twelveUTC.getTime();
  const timeRemainingMs = twelveUTCTimestamp - nowTimestamp;

  const secondsRemaining = Math.floor(timeRemainingMs / 1000) % 60;
  const minutesRemaining = Math.floor(timeRemainingMs / (1000 * 60)) % 60;
  const hoursRemaining = Math.floor(timeRemainingMs / (1000 * 60 * 60));

  return {
    hours: hoursRemaining,
    minutes: minutesRemaining,
    seconds: secondsRemaining,
  };
}
export const CountdownHabit = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const remaing = timeUntil12UTC();
    setTime(remaing);

    console.log({ remaing });

    const interval = setInterval(() => {
      setTime(remaing);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const hoursFormatted = time.hours < 10 ? `0${time.hours}` : time.hours;
  const minutesFormatted =
    time.minutes < 10 ? `0${time.minutes}` : time.minutes;
  const secondsFormatted =
    time.seconds < 10 ? `0${time.seconds}` : time.seconds;

  if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
    return <p className="text-center text-slate-500">-:-:-</p>;
  }

  return (
    <p className="text-center text-slate-500">
      {hoursFormatted}:{minutesFormatted}:{secondsFormatted} until reset (may
      take 1h to update)
    </p>
  );
};
