"use client";

import { FC, useState, useEffect } from "react";
import { Statistic } from "./Statistic";
import { Habit } from "@prisma/client";
import { SubscriptionWithHabit } from "@/libs/types";
import { formatNumber, getSubscription } from "@/libs/helpers";

type Props = {
  habit: Habit;
};

export const SubFeatures: FC<Props> = ({ habit }) => {
  const [subscription, setSubscription] = useState<SubscriptionWithHabit>(
    {} as SubscriptionWithHabit
  );

  useEffect(() => {
    getSubscription(habit.name).then((sub) => {
      setSubscription(sub.data);
    });
  }, []);

  const streak = subscription?.streak || 0;

  return (
    <article className="flex justify-between w-full">
      <Statistic description="Minutes" value={habit.minutes} />
      <Statistic description="Points" value={habit.points} />
      <Statistic
        description="Followers"
        value={formatNumber(habit.followersQty)}
      />
      <Statistic description="Day Streak" value={streak} />
    </article>
  );
};
