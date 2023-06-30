"use client";

import { HabitCard } from "@/components/HabitCard";
import { Completed } from "@/components/Completed";
import Link from "next/link";
import { getUserHabits } from "@/prisma/helpers";
import { Habit } from "@prisma/client";
import { useEffect, useState } from "react";
import { Navigator } from "@/components/Footer";

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
      <div className="flex flex-row gap-5 lg:flex-row mb-28">
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
              habitName={sub.habit.name}
              title={sub.habit.title}
              suffix={<Completed completed={!!sub.completedAt} />}
              src={sub.habit.img}
            />
          </Link>
        ))}
      </div>
      <Navigator />
    </>
  );
};

export default Home;
