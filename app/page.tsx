"use client";

import { HabitCard } from "@/components/HabitCard";
import { Completed } from "@/components/Completed";
import Link from "next/link";
import { getUserHabits } from "@/prisma/helpers";
import { TITLES } from "@/libs/constants";
import { Habit } from "@prisma/client";
import { useEffect, useState } from "react";

// @ts-ignore
const Home = (a) => {
  const [subscriptions, setSubscriptions] = useState<any>([]);

  // find a better way
  // Option 1: useSWR
  // Option 2: useQuery
  useEffect(() => {
    (async () => {
      const req = await fetch("/api/subscriptions");
      const subscriptions = await req.json();
      console.log("subscriptions", subscriptions);

      setSubscriptions(subscriptions);
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row mb-28">
        {/* @ts-ignore */}
        {subscriptions.map((sub) => (
          <Link
            href={`/habit/${sub.habit.name}/scan`}
            key={sub.habit.name}
            passHref
            legacyBehavior
          >
            <HabitCard
              minutes={20}
              // @ts-ignore
              title={TITLES[sub.habit.name]}
              suffix={<Completed completed={!!sub.completedAt} />}
              src={sub.habit.img}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
