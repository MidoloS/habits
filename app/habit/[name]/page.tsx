import { FollowButton } from "@/components/Button/Follow";
import { Minutes } from "@/components/Info/Mins";
import { Score } from "@/components/Info/Score";
import { Paragraph } from "@/components/Paragraph";
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
      <div className="flex flex-col max-h-48 gap-6">
        <Image
          alt={name}
          src={`/images/${habit.name}.png`}
          height={600}
          width={600}
          className="rounded-xl"
        />
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{TITLES[habit.name]}</h1>
            <div className="flex gap-6">
              <Minutes minutes={5} />
              <Score score={10} />
            </div>
          </div>
          <FollowButton />
        </div>
        <div>
          <h2 className="font-bold text-xl">About</h2>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias unde
            aut nemo sapiente nesciunt maxime obcaecati fuga maiores natus
            dolore nulla doloribus quos quaerat, itaque fugiat ab reiciendis
            nihil vitae.
          </Paragraph>
        </div>
      </div>
    </>
  );
}
