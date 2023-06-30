import { FollowHabitButton } from "@/components/Button/FollowHabitButton";
import { ReadMore } from "@/components/Button/ReadMore";
import { getHabit, getUserHabits } from "@/prisma/helpers";
import Image from "next/image";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
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
      <div className="flex flex-col gap-2 h-screen">
        <figure>
          <Image
            alt={name}
            src={habit.img || "/images/placeholder.png"}
            height={677}
            width={452}
            className="md:rounded-xl"
          />
        </figure>
        <main className="container mx-auto p-6 flex flex-col justify-between h-full">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{habit.title}</h1>
              <p className="text-sm text-slate-500">{habit.subtitle}</p>
            </div>
            <FollowHabitButton
              habitName={habit.name}
              isFollowing={isFollowing}
            />
          </div>
          <ReadMore />
        </main>
      </div>
    </>
  );
}
