import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FollowHabitButton } from "@/components/Button/FollowHabitButton";
import { ReadMore } from "@/components/Button/ReadMore";
import { Features } from "@/components/Info/Features";
import { isFollowing } from "@/libs/helpers";
import { getHabit, getUserHabits } from "@/prisma/helpers";
import { Subscriptions, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const { data: habit, error } = await getHabit(name);
  const user = await getUserHabits("midolo.1912@gmail.com");

  if (error) {
    return <h1>Habit not found</h1>;
  }

  if (!user) {
    return null;
  }

  console.log(user.subscriptions, habit.name);

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
                isFollowing={isFollowing({
                  habitName: habit.name,
                  subscriptions: user.subscriptions,
                })}
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
