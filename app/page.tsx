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

  if (!subscriptions) {
    return <h1>You have no habit, begin your journey</h1>;
  }

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row">
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
              src={`/images/${sub.habit.name}.png`}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
