import { Habit, Subscriptions } from "@prisma/client";
import { FC } from "react";
import Link from "next/link";
import { HabitCard } from "./HabitCard";
import { SubscriptionWithHabit } from "@/libs/types";

type Props = {
  habits: Habit[];
  urlPattern: string; // example: /habits/{habitName}/scan
  Suffix?: FC<{ subscription: Subscriptions }>;
};

export const HabitList: FC<Props> = ({ habits, urlPattern, Suffix }) => {
  console.log(habits);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row gap-4">
        {habits.map((habit) => (
          <Link
            href={urlPattern.replace("{habitName}", habit.name)}
            key={habit.name}
            passHref
            legacyBehavior
          >
            <a>
              <HabitCard
                minutes={habit.minutes}
                title={habit.title}
                src={habit.img}
                habitName={habit.name}
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
