import { Habit, Subscriptions } from "@prisma/client";
import { FC } from "react";
import Link from "next/link";
import { HabitCard } from "./Card";

type Props = {
  habits: Habit[];
  urlPattern: string; // example: /habits/{habitName}/scan
  Suffix?: FC<{ subscription: Subscriptions }>;
};

export const HabitList: FC<Props> = ({ habits, urlPattern, Suffix }) => {
  return (
    <div className="flex gap-4 flex-col md:grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
      {habits.map((habit) => (
        <Link
          href={urlPattern.replace("{habitName}", habit.name)}
          key={habit.name}
          passHref
          legacyBehavior
        >
          <a>
            <HabitCard
              subtitle={`${habit.minutes} mins`}
              title={habit.title}
              src={habit.wideImage}
              habitName={habit.name}
            />
          </a>
        </Link>
      ))}
    </div>
  );
};
