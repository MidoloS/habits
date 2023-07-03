import { FollowHabitButton } from "@/components/Button/FollowHabitButton";
import { ReadMore } from "@/components/Button/ReadMore";
import { Feature } from "@/components/Feature";
import { Features } from "@/components/Features";
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
      <div className="flex flex-col">
        <figure className="w-full">
          <Image
            alt={name}
            height={677}
            width={452}
            src={habit.img || "/images/placeholder.png"}
            className="md:rounded-xl"
          />
        </figure>
        <main className="z-10 bottom-0 absolute bg-slate-50 w-full rounded-3xl">
          <div className="container mx-auto p-6 flex flex-col h-full gap-4 ">
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
            <div className="flex flex-row justify-between text-center">
              <Features habit={habit} />
            </div>
            <ReadMore />
          </div>
        </main>
      </div>
    </>
  );
}
