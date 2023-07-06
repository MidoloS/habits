"use client";

import { getSubscriptions } from "@/libs/helpers";
import { HabitList } from "./HabitList";
import { useEffect, useState } from "react";

export const UserHabits = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions().then((subs) => {
      // @ts-ignore
      console.log({ habits: subs.map((sub) => sub.habit) });

      // @ts-ignore
      setSubscriptions(subs.map((sub) => sub.habit));
    });
  }, []);

  return (
    <HabitList habits={subscriptions} urlPattern="/habits/{habitName}/scan" />
  );
};
