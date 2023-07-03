import { Navigator } from "@/components/Navigator";
import { HabitCard } from "@/components/HabitCard";
import { getHabits } from "@/prisma/helpers";
import Link from "next/link";

export default async function Page() {
  const { data: habits, error } = await getHabits();

  if (error) {
    return <div>{error}</div>;
  }

  // si anda

  return (
    <>
      <main className="container mx-auto p-8">
        <h1>Your Habits</h1>
        <div className="max-w-md overflow-x-auto">
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
      </main>
      <Navigator />
    </>
  );
}
