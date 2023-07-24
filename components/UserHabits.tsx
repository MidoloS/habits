"use client";

import { getSubscriptions } from "@/libs/helpers";
import { HabitList } from "./HabitList";
import { useEffect, useState } from "react";
import { Habit, Subscriptions } from "@prisma/client";
import { SubscriptionWithHabit } from "@/libs/types";
import Link from "next/link";
import { HabitCard } from "./HabitCard";
import { EmptyHabit } from "./EmptyHabit";

const COMPLETED_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      id="badge-check_2_"
      data-name="badge-check (2)"
      d="M24.02,12.02a5.28,5.28,0,0,0-1.927-4.131A5.5,5.5,0,0,0,20.5,3.52a5.275,5.275,0,0,0-4.281-1.558,5.478,5.478,0,0,0-8.339-.035A5.469,5.469,0,0,0,3.518,3.52,5.287,5.287,0,0,0,1.962,7.8a5.488,5.488,0,0,0-.035,8.347,5.5,5.5,0,0,0,1.591,4.369A5.271,5.271,0,0,0,7.8,22.077a5.478,5.478,0,0,0,8.339.035A5.5,5.5,0,0,0,20.5,20.519a5.287,5.287,0,0,0,1.556-4.284,5.5,5.5,0,0,0,1.962-4.215Zm-6.465-1.436-4.743,4.575a3,3,0,0,1-4.233-.013l-2.254-2.1a1,1,0,0,1,1.362-1.467l2.28,2.12a1.008,1.008,0,0,0,1.441.025L16.165,9.14a1,1,0,0,1,1.39,1.442Z"
      transform="translate(-0.02 -0.02)"
      fill="#020617"
    />
  </svg>
);

export const UserHabits = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithHabit[]>(
    []
  );

  useEffect(() => {
    getSubscriptions().then((subs) => {
      console.log({ subs });

      setSubscriptions(subs.data);
    });
  }, []);

  const Completed = ({ completedAt }: { completedAt: Date | null }) => {
    if (!completedAt) {
      return null;
    }
    return <div className="bg-slate-50 p-3 rounded-lg">{COMPLETED_ICON}</div>;
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row gap-4 px-4">
        {subscriptions.map((sub) => (
          <Link
            href={`/habit/${sub.habit.name}/complete`}
            key={sub.habit.name}
            passHref
            legacyBehavior
          >
            <a>
              <HabitCard
                subtitle={`${sub.habit.minutes} mins`}
                title={sub.habit.title}
                src={sub.habit.img}
                habitName={sub.habit.name}
                suffix={<Completed completedAt={sub.completedAt} />}
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
