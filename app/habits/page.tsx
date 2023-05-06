import { HabitCard } from "@/components/HabitCard";
import { Completed } from "@/components/Completed";
import Link from "next/link";
import { getUserHabits } from "@/prisma/helpers";
import { TITLES } from "@/libs/constants";

export default async function Home() {
  const user = await getUserHabits("midolo.1912@gmail.com");

  if (!user) {
    return null;
  }

  const { subscriptions } = user;
  return (
    <>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mb-28">
        {subscriptions.map((sub) => (
          <Link
            href={`/habit/${sub.habit.name}`}
            key={sub.habit.name}
            passHref
            legacyBehavior
          >
            <HabitCard
              minutes={20}
              title={TITLES[sub.habit.name]}
              suffix={<Completed completed={!!sub.completedAt} />}
              src={sub.habit.img}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
