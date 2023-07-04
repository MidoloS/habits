"use client";

import { Navigator } from "@/components/Navigator";
import { HabitCard } from "@/components/HabitCard";
import { getHabits } from "@/prisma/helpers";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/libs/hooks";

export default async function Page() {
  const { data: habits, error } = await getHabits();

  if (error) {
    return <div>{error}</div>;
  }

  const { login, profile } = useUser();

  return (
    <>
      <main className="flex flex-col gap-8 container mx-auto px-4">
        <figure className="flex items-center gap-4 mt-8">
          <Image
            src={profile?.picture}
            width={70}
            height={70}
            alt={""}
            className="rounded-full"
          />
          <figcaption>
            <p className="text-sm text-slate-500">Welcome</p>
            <h2 className="text-slate-900 font-bold">{profile?.name}</h2>
          </figcaption>
        </figure>
        <div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for a habit"
            className="bg-slate-200 rounded-md w-full p-4 text-sm"
          />
        </div>

        <div className="max-w-md">
          <h1 className="font-bold text-slate-950 text-2xl mb-4">Habits</h1>
          <div className="overflow-x-auto">
            <div className="flex flex-row gap-4">
              {habits.map((habit) => (
                <Link
                  href={`/habit/${habit.name}`}
                  key={habit.name}
                  passHref
                  legacyBehavior
                >
                  <HabitCard
                    minutes={habit.minutes}
                    title={habit.title}
                    src={habit.img}
                    habitName={habit.name}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Navigator />
    </>
  );
}
