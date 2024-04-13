import Link from "next/link";
import { HabitCard } from "./Card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SubscriptionWithHabit } from "@/libs/types";

const COMPLETED_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      id="badge-check_2_"
      data-name="badge-check (2)"
      d="M24.02,12.02a5.28,5.28,0,0,0-1.927-4.131A5.5,5.5,0,0,0,20.5,3.52a5.275,5.275,0,0,0-4.281-1.558,5.478,5.478,0,0,0-8.339-.035A5.469,5.469,0,0,0,3.518,3.52,5.287,5.287,0,0,0,1.962,7.8a5.488,5.488,0,0,0-.035,8.347,5.5,5.5,0,0,0,1.591,4.369A5.271,5.271,0,0,0,7.8,22.077a5.478,5.478,0,0,0,8.339.035A5.5,5.5,0,0,0,20.5,20.519a5.287,5.287,0,0,0,1.556-4.284,5.5,5.5,0,0,0,1.962-4.215Zm-6.465-1.436-4.743,4.575a3,3,0,0,1-4.233-.013l-2.254-2.1a1,1,0,0,1,1.362-1.467l2.28,2.12a1.008,1.008,0,0,0,1.441.025L16.165,9.14a1,1,0,0,1,1.39,1.442Z"
      transform="translate(-0.02 -0.02)"
      fill="#020617"
    />
  </svg>
);

export const UserHabits = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  if (!session?.user?.email) {
    return null;
  }

  const subscriptions = session?.user?.subs;

  if (!subscriptions.length) {
    return null;
  }

  const Completed = ({ completedAt }: { completedAt: Date | null }) => {
    if (!completedAt) {
      return null;
    }
    return (
      <div className="bg-slate-50 py-2 px-4 rounded-lg flex gap-2 font-medium text-sm items-center">
        Completed
      </div>
    );
  };

  return (
    <div className="flex gap-4 flex-col md:grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
      {[
        ...subscriptions.sort((a, b) => {
          if (a.completedAt && b.completedAt) {
            return 0;
          }
          if (a.completedAt && !b.completedAt) {
            return 1;
          }
          if (!a.completedAt && b.completedAt) {
            return -1;
          }
          return 0;
        }),
      ].map((sub: SubscriptionWithHabit) => (
        <Link
          href={`/habit/${sub.habit.name}/complete`}
          key={sub.habit.name}
          passHref
          legacyBehavior
        >
          <a>
            <HabitCard
              subtitle={`${sub.habit.minutes} mins`}
              title={sub.habit.title}
              src={sub.habit.wideImage}
              habitName={sub.habit.name}
              suffix={<Completed completedAt={sub.completedAt} />}
            />
          </a>
        </Link>
      ))}
    </div>
  );
};
