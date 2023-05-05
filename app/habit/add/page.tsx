import { PrimaryButton } from "@/components/Button/Primary";
import { SecondaryButton } from "@/components/Button/Secondary";
import { Camera } from "@/components/Camera";
import CompleteHabitButton from "@/components/CompleteHabitButton";
import GoBackButton from "@/components/GoBackButton";
import { HabitCard } from "@/components/HabitCard";
import { TITLES } from "@/libs/constants";
import { getHabit, getHabits } from "@/prisma/helpers";
import { HabitName } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const habits = await getHabits();

  console.log(habits);

  return (
    <>
      <h1>Add habit</h1>
      <div className="flex flex-col gap-4 mb-32">
        {habits.map((habit) => (
          <Link
            href={`/habit/${habit.name}`}
            key={habit.name}
            passHref
            legacyBehavior
          >
            <HabitCard
              minutes={20}
              title={TITLES[habit.name]}
              src={habit.img}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
