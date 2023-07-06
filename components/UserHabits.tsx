"use client";

import { getSubscriptions } from "@/libs/helpers";
import { HabitList } from "./HabitList";
import { useEffect, useState } from "react";

export const UserHabits = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions().then((subs) => {
      // @ts-ignore
      setSubscriptions(subs.data.map((sub) => sub.habit));
    });
  }, []);

  return (
    <HabitList
      habits={subscriptions}
      urlPattern="/habit/{habitName}/complete"
    />
  );
};
