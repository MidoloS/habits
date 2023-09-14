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

  const { data: habit } = await getHabit(name);

  if (!habit?.createdAt) {
    return <h1>Habit not found</h1>;
  }

  return (
    <>
      <Header />
      <Confetti />
      <main className="p-7 flex flex-col gap-10 h-screen justify-center">
        <h1 className="text-center font-semibold text-xl">Congratulations!</h1>
        <div className="flex justify-between items-end">
          <Image
            src="/images/olive-left.png"
            width={70}
            height={120}
            alt="olive wreath left"
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
          />
        </div>
        <p className="text-center text-slate-950 text-sm">
          Dont forget that its the small accomplishments that make a{" "}
          <span className="text-slate-950 font-bold">
            big change over time!
          </span>
        </p>
        <Link
          className="bg-slate-950 text-white p-4 w-full rounded-xl text-center text-sm font-medium"
          href="/home"
        >
          Keep Improving
        </Link>
      </main>
    </>
  );
}
