import { Habit } from "@prisma/client";
import { FC } from "react";
import Link from "next/link";
import { HabitCard } from "./HabitCard";

type Props = {
  habits: Habit[];
  urlPattern: string; // example: /habits/{habitName}/scan
};

export const HabitList: FC<Props> = ({ habits = [], urlPattern }) => {
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
