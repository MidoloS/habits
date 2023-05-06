import { HabitCard } from "@/components/HabitCard";
import { TITLES } from "@/libs/constants";
import { getHabits } from "@/prisma/helpers";
import Link from "next/link";

export default async function Page() {
  const habits = await getHabits();

  return (
    <div className="flex flex-col gap-4 mb-32">
      {habits.map((habit) => (
        <Link
          href={`/habit/${habit.name}/scan`}
          key={habit.name}
          passHref
          legacyBehavior
        >
          <HabitCard minutes={20} title={TITLES[habit.name]} src={habit.img} />
        </Link>
      ))}
    </div>
  );
}
