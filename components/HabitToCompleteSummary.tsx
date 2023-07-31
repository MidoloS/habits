import { getServerSession } from "next-auth";
import { CircularProgressbar } from "./CircularProgressBar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SubscriptionWithHabit } from "@/libs/types";
import Link from "next/link";
import { FC } from "react";

type Props = {
  subscriptions: SubscriptionWithHabit[];
};

// @ts-ignore
export const HabitToCompleteSummary: FC<Props> = async ({
  subscriptions = [],
}) => {
  const totalSubs = subscriptions.length;
  const completedSubs = subscriptions.filter(
    (sub: SubscriptionWithHabit) => sub.completedAt
  ).length;

  console.log({ totalSubs, completedSubs });

  const percentajeCompleted = (completedSubs / totalSubs) * 100;

  const title = percentajeCompleted > 50 ? "Good job!" : "Keep going!";

  const uncompletedHabit = subscriptions.filter((sub) => !sub.completedAt)[0];

  console.log({ uncompletedHabit });

  if (!uncompletedHabit) {
    return (
      <div className="bg-slate-950 flex justify-between py-2 px-6 items-center rounded-xl">
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
        <div className="bg-slate-950 flex justify-between px-6 items-center rounded-xl">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-50 font-medium">{title}</h1>
            <p className="text-slate-500 text-sm">
              {completedSubs} of {totalSubs} habits completed
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
