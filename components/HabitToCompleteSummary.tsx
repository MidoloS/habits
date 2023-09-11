import { getServerSession } from "next-auth";
import { CircularProgressbar } from "./CircularProgressBar";
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
  const completedSubs = subscriptions.filter(
    (sub: SubscriptionWithHabit) => sub.completedAt
  ).length;

  console.log({ totalSubs, completedSubs });

  const percentajeCompleted = (completedSubs / totalSubs) * 100;

  const title = percentajeCompleted > 50 ? "GOOD JOB!" : "KEEP GOING!";

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
        {/* shadow with 0, 3, 30 */}
        <div className="bg-white flex justify-between px-6 items-center rounded-xl shadow-slate-200 shadow-2xl">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-400 font-medium text-xs tracking-wide">
              {title}
            </h1>
            <p className="text-slate-950 font-semibold text-sm ">
              {completedSubs} of {totalSubs} Habits completed
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
