import { FC } from "react";
import { Habit } from "@prisma/client";
import { Statistic } from "./Statistic";
import { formatNumber } from "@/libs/helpers";

type Props = {
  habit: Habit;
};

export const HabitFeatures: FC<Props> = ({ habit }) => {
  if (!habit) {
    return null;
  }

  const { points, minutes, followersQty } = habit;

  const pointsToDisplay = points === 0 ? "No Ranked" : habit.points;

  return (
    <article className="flex justify-between w-full">
      <Statistic value={minutes} description="Minutes" />
      <Statistic value={pointsToDisplay} description="Points" />
      <Statistic value={formatNumber(followersQty)} description="Followers" />
      <Statistic value="5" description="Day Streak" />
    </article>
  );
};
