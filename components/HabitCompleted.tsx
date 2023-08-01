"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PrimaryButton } from "./Button/Primary";
import JSConfetti from "js-confetti";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SubscriptionWithHabit } from "@/libs/types";
import { Habit } from "@prisma/client";
import Link from "next/link";

export const HabitCompleted = () => {
  const res = useSearchParams();
  const { data: session } = useSession();
  const [habit, setHabit] = useState<Habit>();

  const habitName = res?.get("completed");

  const habits = (session?.user.subs || []) as SubscriptionWithHabit[];

  const sub = habits.find((sub) => sub.habitName === habitName);

  useEffect(() => {
    setHabit(sub?.habit);

    if (!sub) {
      return;
    }

    const success = new Audio("/success.mp3");
    success.play();

    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["⚡️", "💥", "✨", "💫", "🌸"],
      emojiSize: 150,
    });
  }, [sub?.habit?.name]);

  if (!sub) {
    return null;
  }

  if (!habit) {
    return null;
  }

  return (
    <div className="w-screen h-screen z-10 bg-black bg-opacity-80 flex items-center justify-center absolute top-0 p-8">
      <div className="bg-slate-50 z-20 p-6 rounded-xl gap-4 flex flex-col max-w-md">
        <div>
          <p className="text-center text-slate-500 text-sm mb-2">
            Congratulations!
          </p>
          <h1 className="text-center text-slate-950 text-3xl font-bold font-heading">
            {habit?.points === 0 ? "Completed" : `+${habit.points} XP`}
          </h1>
        </div>
        <p className="text-center text-slate-950 text-sm">
          Dont forget that its the small accomplishments that make a{" "}
          <span className="text-slate-950 font-bold">
            big change over time!
          </span>
        </p>

        <Link
          href="/home"
          className="bg-slate-950 p-4 flex items-center text-slate-50 justify-center rounded-xl"
        >
          Great!
        </Link>
      </div>
    </div>
  );
};
