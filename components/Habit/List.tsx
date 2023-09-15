import { Habit, Subscriptions } from "@prisma/client";
import { FC } from "react";
import Link from "next/link";
import { HabitCard } from "./Card";
import { SubscriptionWithHabit } from "@/libs/types";

type Props = {
  habits: Habit[];
  urlPattern: string; // example: /habits/{habitName}/scan
  Suffix?: FC<{ subscription: Subscriptions }>;
};

export const HabitList: FC<Props> = ({ habits, urlPattern, Suffix }) => {
  console.log(habits);

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-5 mb-16">
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
