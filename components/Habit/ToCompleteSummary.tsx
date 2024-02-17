import { getServerSession } from "next-auth";
import { CircularProgressbar } from "../Info/CircularProgressBar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SubscriptionWithHabit } from "@/libs/types";
import Link from "next/link";
import { FC } from "react";

type Props = {
  subscriptions: SubscriptionWithHabit[] | undefined;
};

// @ts-ignore
export const HabitToCompleteSummary: FC<Props> = async ({
  subscriptions = [],
}) => {
  const totalSubs = subscriptions.length;
  const completedSubs = 1;
  const percentajeCompleted = (completedSubs / totalSubs) * 100;

  const title = percentajeCompleted > 50 ? "GOOD JOB!" : "KEEP GOING!";

  const uncompletedHabit = subscriptions.filter((sub) => !sub.completedAt)[0];

  if (!uncompletedHabit) {
    return (
      <div className="bg-zinc-950 flex justify-between py-2 px-6 items-center rounded-xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-50 font-medium">Congratulations!</h1>
          <p className="text-slate-500 text-sm">
            You have completed all your habits
          </p>
        </div>
        <div>
          <CircularProgressbar percentage={100} strokeWidth={5} />
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`${process.env.NEXTAUTH_URL}/habit/${uncompletedHabit.habit.name}/complete`}
      key={uncompletedHabit.habit.name}
      passHref
      legacyBehavior
    >
      <a>
        <div className="border border-zinc-600 bg-zinc-950 flex justify-between px-6 items-center rounded-xl ">
          <div className="flex flex-col gap-1">
            <h1 className="text-zinc-400 font-medium text-sm tracking-wide">
              Habits completed
            </h1>
            <p>
              <span className="text-zinc-50 text-3xl font-medium">
                {completedSubs}
              </span>
              <span className="text-zinc-400">/{totalSubs}</span>
            </p>
          </div>
          <div>
            <CircularProgressbar
              percentage={percentajeCompleted}
              strokeWidth={5}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};
