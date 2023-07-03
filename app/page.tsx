"use client";

import { HabitCard } from "@/components/HabitCard";
import { Completed } from "@/components/Completed";
import Link from "next/link";
import { getUserHabits } from "@/prisma/helpers";
import { Habit, Subscriptions } from "@prisma/client";
import { useEffect, useState } from "react";
import { Navigator } from "@/components/Navigator";

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
      <main className="container mx-auto px-4">
        <div className="max-w-md md:max-w-7xl overflow-x-auto">
          <div className="flex flex-row gap-4">
            {subscriptions.map((sub: any) => (
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
        </div>
      </main>
      <Navigator />
    </>
  );
};

export default Home;
