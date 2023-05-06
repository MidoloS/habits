import { FollowHabitButton } from "@/components/Button/FollowHabitButton";
import { Minutes } from "@/components/Info/Mins";
import { Score } from "@/components/Info/Score";
import { Paragraph } from "@/components/Paragraph";
import { TITLES } from "@/libs/constants";
import { getHabit, getUserHabits } from "@/prisma/helpers";
import { HabitName } from "@prisma/client";
import Image from "next/image";

export default async function Page({
  params: { name },
}: {
  params: { name: HabitName };
}) {
  const habit = await getHabit(name);
  const user = await getUserHabits("midolo.1912@gmail.com");

  console.log(habit);

  if (!habit?.createdAt) {
    return <h1>Habit not found</h1>;
  }

  if (!user) {
    return null;
  }

  console.log(user.subscriptions, habit.name);

  const isFollowing = user.subscriptions?.some(
    (sub) => sub.habitName === habit.name
  );

  console.log(isFollowing);

  return (
    <>
      <div className="flex flex-col max-h-48 gap-6">
        <Image
          alt={name}
          src={habit.img || "/images/placeholder.png"}
          height={600}
          width={600}
          className="rounded-xl"
        />
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{TITLES[habit.name]}</h1>
            <div className="flex gap-6">
              <Minutes minutes={habit.minutes} />
              <Score score={habit.points} />
            </div>
          </div>
          <FollowHabitButton habitName={habit.name} isFollowing={isFollowing} />
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
