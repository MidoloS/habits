import { Navigator } from "@/components/Navigator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { UserHabits } from "@/components/UserHabits";
import { UserWelcome } from "@/components/UserWelcome";
import { HabitCompleted } from "@/components/HabitCompleted";
import { EmptyHabit } from "@/components/EmptyHabit";
import { HabitToCompleteSummary } from "@/components/HabitToCompleteSummary";
import { CountdownHabit } from "@/components/CountdownHabit";
import { Switch } from "@/components/Switch";
import { EnableNotification } from "@/components/EnableNotification";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  if (session?.user?.subs.length === 0) {
    return (
      <main className="flex flex-col gap-8 px-4 mt-4">
        <div className="flex flex-col gap-8">
          <UserWelcome img={session.user?.image} name={session.user?.name} />
        </div>

        <div className="flex  justify-center">
          <EmptyHabit />
        </div>
      </main>
    );
  }

  return (
    <>
      <EnableNotification />
      <HabitCompleted />
      <main className="flex flex-col gap-8 p-7">
        <div className="flex flex-col gap-8">
          <UserWelcome img={session.user?.image} name={session.user?.name} />

          <div className="flex flex-col gap-2">
            <HabitToCompleteSummary subscriptions={session?.user?.subs} />
            <CountdownHabit />
          </div>
        </div>

        <div>
          <h1 className="text-slate-400 font-medium mb-4 text-sm tracking-wide">
            TODAY&aposS HABITS
          </h1>
          {/* @ts-ignore */}
          <UserHabits />
        </div>
      </main>
      <Navigator />
    </>
  );
};

export default Home;
