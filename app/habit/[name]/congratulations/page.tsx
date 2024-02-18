import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getHabit } from "@/prisma/helpers";
import { Header } from "@/components/Navigator/Header";
import { Confetti } from "@/components/Info/Confetti";
import { StreakProgress } from "@/components/Habit/StreakProgress";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/?callbackUrl=/habit/${name}/complete`);
  }

  const subscriptions = session?.user?.subs || [];

  const isntSubscribed = !subscriptions.some((sub) => sub.habitName === name);

  if (isntSubscribed) {
    redirect(`https://www.habitai.io/habit/${name}`);
  }

  const uncompletedHabit = subscriptions.find((sub) => !sub.completedAt);

  const currentHabit = subscriptions.find((sub) => sub.habitName === name);

  const { data: habit } = await getHabit(name);

  if (!habit?.createdAt) {
    return <h1>Habit not found</h1>;
  }

  return (
    <>
      <Header />
      <Confetti msDelay={800} />
      <main className="p-7 flex flex-col gap-14 h-screen justify-center animate-jump-in animate-duration-500 overflow-hidden">
        <h1 className="text-center font-semibold text-zinc-50 text-xl">
          Congratulations!
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Image
              src="/images/olive-left.png"
              width={70}
              height={120}
              alt="olive wreath left"
              unoptimized
            />
            {habit.points >= 0 ? (
              <div className="flex flex-col items-center justify-center gap-1 text-zinc-50">
                <h2 className="subheading-1">EARNED</h2>
                <p className="text-xl text-zinc-50 font-semibold">
                  +{habit.points} XP
                </p>
              </div>
            ) : (
              <h2 className="subheading-1">NO POINTS EARNED</h2>
            )}
            <Image
              src="/images/olive-right.png"
              width={70}
              height={120}
              alt="olive wreath right"
              unoptimized
            />
          </div>

          <p className="text-center text-zinc-400 text-sm leading-7">
            Dont forget that its the small accomplishments that make a{" "}
            <span className="text-zinc-50 font-bold">
              big change over time!
            </span>
          </p>
          <div className="flex justify-center">
            <StreakProgress streakDays={currentHabit?.streak || 1} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          {uncompletedHabit?.habitName && (
            <Link
              className="bg-zinc-50 text-zinc-950 p-4 rounded-xl text-center text-sm font-medium w-full"
              href={`/habit/${uncompletedHabit?.habitName}/complete`}
            >
              Next Habit
            </Link>
          )}
          <Link
            className="border-zinc-500 text-zinc-50 border shadow-sm rounded-xl p-4 flex items-center justify-center text-sm font-medium w-full"
            href="/home"
          >
            Go Home
          </Link>
        </div>
      </main>
    </>
  );
}
