"use client";

import { useState } from "react";

const hoursUntil12UTC = () => {
  const now = new Date();
  const hours = 24 - now.getUTCHours();
  return hours;
};

export const CountdownHabit = () => {
  const [hours, setHours] = useState(hoursUntil12UTC());

  setTimeout(() => {
    setHours(hoursUntil12UTC());
  }, 1000 * 60 * 60);

  return <p className="text-center text-slate-500">{hours}h until reset</p>;
};
