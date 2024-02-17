"use client";

import { useState } from "react";

const hoursUntil12UTC = () => {
  const now = new Date();
  const hours = 24 - now.getUTCHours();
  return hours;
};

const ONE_HOUR = 1000 * 60 * 60;

export const CountdownHabit = () => {
  const [hours, setHours] = useState(hoursUntil12UTC());

  setTimeout(() => {
    setHours(hoursUntil12UTC());
  }, ONE_HOUR);

  return <p className="text-center text-zinc-400">{hours}h until reset</p>;
};
