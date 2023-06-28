import { HabitCard } from "@/components/HabitCard";
import { getHabits } from "@/prisma/helpers";
import Link from "next/link";

export default async function Page() {
  const habits = await getHabits();

  return (
    <div className="flex flex-col gap-4 mb-32">
      {habits.map((habit) => (
        <Link
          href={`/habit/${habit.name}`}
          key={habit.name}
          passHref
          legacyBehavior
        >
          <HabitCard minutes={20} title={habit.title} src={habit.img} />
        </Link>
      ))}
    </div>
  );
}
