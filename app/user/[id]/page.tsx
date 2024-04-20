import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserWelcome } from "@/components/User/Welcome";
import { Navigator } from "@/components/Navigator/Navigator";

import { DeleteAccount } from "@/components/Button/DeleteAccount";
import { getHabits, getUserById, getUserRank } from "@/prisma/helpers";
import { Header } from "@/components/Navigator/Header";
import Image from "next/image";
import { formatName, formatNumber } from "@/libs/helpers";
import { HabitCard } from "@/components/Habit/Card";
import { BadgeList } from "@/components/Badges/List";

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
  const { data: habits } = await getHabits();
  const currentUserRank = await getUserRank(user?.points || 0);

  if (!user?.img) {
    return null;
  }

  const streaks = user.subscriptions.map((sub) => sub.streak);
  const maxStreak = Math.max(...streaks, 0);

  const stats = [
    {
      label: "Points",
      value: formatNumber(user.points),
    },
    {
      label: "Top",
      value: currentUserRank,
    },
    {
      label: "Day Streak",
      value: maxStreak,
    },
    {
      label: "Habits",
      value: user.subscriptions.length,
    },
  ];

  console.log(user);

  return (
    <>
      <Header />

      <main className="flex flex-col bg-gradient-to-t from-zinc-900 to-zinc-950 items-center border-b border-zinc-600">
        <figure className="mt-28 flex items-center flex-col">
          <Image
            src={user?.img}
            height={100}
            width={100}
            alt="User profile"
            className="rounded-full"
          />
          <figcaption className="text-white font-semibold mt-3 text-lg">
            {user.name}
          </figcaption>
        </figure>
        <div className="flex justify-between w-full mt-4 container mx-auto p-7 md:justify-center md:gap-14">
          {stats.map((stat) => (
            <div className="flex flex-col items-center" key={stat.label}>
              <h4 className="text-white text-2xl font-bold">{stat.value}</h4>
              <p className="text-zinc-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>

      <div className="bg-zinc-900">
        <div className="container mx-auto px-5">
          <div>
            <h2 className="subheading-1 mt-8 mb-4">ACHIEVEMENT BADGES</h2>
            {/* @ts-ignore */}
            <BadgeList userEmail={user.email} />
          </div>

          {user.subscriptions.length && (
            <div className="flex flex-col gap-6 w-full">
              <h2 className="subheading-1 mt-8">FOLLOWING HABITS</h2>

              <div className="flex gap-4 flex-col md:grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
                {user.subscriptions.map((sub) => (
                  <HabitCard
                    key={sub.habitName}
                    // @ts-ignore
                    title={
                      habits.find((habit) => habit.name === sub.habitName)
                        ?.title
                    }
                    habitName={sub.habitName}
                    subtitle={`${sub.streak} Days`}
                    // @ts-ignore
                    src={
                      habits.find((habit) => habit.name === sub.habitName)
                        ?.wideImage
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {user?.id === session?.user?.id && (
          <div className="pb-20 pt-5 text-center">
            <DeleteAccount />
          </div>
        )}
      </div>

      <Navigator userId={session?.user?.id} />
    </>
  );
}
