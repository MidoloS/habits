import Camera from "@/components/Camera";
import CompleteHabitButton from "@/components/CompleteHabitButton";
import GoBackButton from "@/components/GoBackButton";
import { TITLES } from "@/libs/constants";
import { getHabit } from "@/prisma/helpers";
import { HabitName } from "@prisma/client";
import Image from "next/image";

export default async function Page({
  params: { name },
}: {
  params: { name: HabitName };
}) {
  const habit = await getHabit(name);

  console.log(habit);

  if (!habit?.createdAt) {
    return <h1>Habit not found</h1>;
  }

  return (
    <>
      <div className="max-h-48">
        <Image
          alt={name}
          src={`/images/${habit.name}.png`}
          height={600}
          width={600}
        />
        <h1>{TITLES[habit.name]}</h1>
        <Camera />
        <CompleteHabitButton habitName={name} />
        <GoBackButton />
      </div>
    </>
  );
}
