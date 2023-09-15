import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getHabit } from "@/prisma/helpers";
import { Header } from "@/components/Navigator/Header";
import { Confetti } from "@/components/Info/Confetti";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/signin?callbackUrl=/habit/${name}/complete`);
  }

  const subscriptions = session?.user?.subs || [];

  const isntSubscribed = !subscriptions.some((sub) => sub.habitName === name);

  if (isntSubscribed) {
    redirect(`https://www.habitai.io/habit/${name}`);
  }

  const uncompletedHabit = subscriptions.find((sub) => !sub.completedAt);

  console.log("uncompletedHabit", uncompletedHabit);

  const { data: habit } = await getHabit(name);

  if (!habit?.createdAt) {
    return <h1>Habit not found</h1>;
  }

  return (
    <>
      <Header />
      <Confetti msDelay={800} />
      <main className="p-7 flex flex-col gap-14 h-screen justify-center animate-jump-in animate-duration-500 overflow-hidden">
        <h1 className="text-center font-semibold text-xl">Congratulations!</h1>
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
              <div className="flex flex-col items-center justify-center gap-1">
                <h2 className="subheading-1">EARNED</h2>
                <p className="text-xl font-semibold">+{habit.points} XP</p>
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

          <p className="text-center text-slate-950 text-sm leading-7">
            Dont forget that its the small accomplishments that make a{" "}
            <span className="text-slate-950 font-bold">
              big change over time!
            </span>
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Link
            className="bg-slate-950 text-white p-4 rounded-xl text-center text-sm font-medium w-full"
            href={`/habit/${uncompletedHabit?.habitName}/complete`}
          >
            Next Habit
          </Link>
          <Link
            className="bg-slate-50 border-slate-200 border shadow-sm rounded-xl p-4 flex items-center justify-center text-sm font-medium w-full"
            href="/home"
          >
            Go Home
          </Link>
        </div>
      </main>
    </>
  );
}
