"use client";

import { currentDateWithTimezone } from "@/libs/helpers";
import { useEffect, useState } from "react";

const calculateTimeLeft = () => {
  const server = currentDateWithTimezone("America/Indiana/Indianapolis");
  let client = new Date();
  client.setHours(24, 0, 0, 0);
  // @ts-ignore
  const difference = client - server;

  if (difference < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export const CountdownHabit = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const remaing = calculateTimeLeft();

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
    return <p>-:-:-</p>;
  }

  return (
    <p className="text-center text-slate-500">
      {hoursFormatted}:{minutesFormatted}:{secondsFormatted} until reset
    </p>
  );
};
