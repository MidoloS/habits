import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserWelcome } from "@/components/User/Welcome";
import { Navigator } from "@/components/Navigator/Navigator";

import { DeleteAccount } from "@/components/Button/DeleteAccount";
import { getHabits, getUserById } from "@/prisma/helpers";
import { Header } from "@/components/Navigator/Header";
import Image from "next/image";
import { formatName } from "@/libs/helpers";
import { HabitCard } from "@/components/Habit/Card";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/?callbackUrl=/home`);
  }

  const user = await getUserById(id);
  const habits = await getHabits();

  if (!user?.img) {
    return null;
  }

  return (
    <>
      <Header />

      <main className="flex flex-col gap-8 p-7 container mx-auto absolute top-[11%] w-full">
        <article className="flex gap-6">
          <Image
            src={user?.img}
            height={80}
            width={80}
            alt="User profile"
            className="rounded-full"
          />
          <section className="flex flex-col justify-center">
            <p className="text-zinc-50 font-medium">{formatName(user.name)}</p>
            <p className="text-zinc-400 text-sm">
              {user.points}pts • {user.subscriptions.length} Habits
            </p>
          </section>
        </article>
        <div className="flex flex-col gap-6 w-full">
          <h2 className="subheading-1">MY HABITS</h2>

          {user.subscriptions.map((sub) => (
            <HabitCard
              key={sub.habitName}
              // @ts-ignore
              title={
                habits.data.find((habit) => habit.name === sub.habitName)?.title
              }
              habitName={sub.habitName}
              subtitle={`${sub.streak} Days`}
              // @ts-ignore
              src={
                habits.data.find((habit) => habit.name === sub.habitName)
                  ?.wideImage
              }
            />
          ))}
        </div>
        <div>
          <DeleteAccount />
        </div>
      </main>
      <Navigator userId={session?.user?.id} />
    </>
  );
}
