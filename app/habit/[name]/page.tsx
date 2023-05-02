import { PrimaryButton } from "@/components/Button/Primary";
import { SecondaryButton } from "@/components/Button/Secondary";
import { Camera } from "@/components/Camera";
import CompleteHabitButton from "@/components/CompleteHabitButton";
import GoBackButton from "@/components/GoBackButton";
import { TITLES } from "@/libs/constants";
import { getHabit } from "@/prisma/helpers";
import { HabitName } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

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
      <div className="max-h-48 ">
        <Image
          alt={name}
          src={`/images/${habit.name}.png`}
          height={600}
          width={600}
          className="rounded-xl"
        />
        <h1>{TITLES[habit.name]}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias unde
          aut nemo sapiente nesciunt maxime obcaecati fuga maiores natus dolore
          nulla doloribus quos quaerat, itaque fugiat ab reiciendis nihil vitae.
        </p>
        <Link href={`/habit/${name}/scan`}>
          <PrimaryButton>Complete Habit</PrimaryButton>
        </Link>
      </div>
    </>
  );
}
