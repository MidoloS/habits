import { Navigator } from "@/components/Navigator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { UserHabits } from "@/components/UserHabits";
import { UserWelcome } from "@/components/UserWelcome";
import { SearchInput } from "@/components/SearchInput";
import { HabitCompleted } from "@/components/HabitCompleted";
import { EmptyHabit } from "@/components/EmptyHabit";
import { HabitToCompleteSummary } from "@/components/HabitToCompleteSummary";
import { CountdownHabit } from "@/components/CountdownHabit";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  if (!session?.user) {
    return null;
  }

  // @ts-ignore
  if (session?.user?.subs.length === 0) {
    return (
      <main className="flex flex-col gap-8">
        <div className="px-4 flex flex-col gap-8">
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
      <HabitCompleted />
      <main className="flex flex-col gap-8">
        <div className="px-4 flex flex-col gap-8">
          <UserWelcome img={session.user?.image} name={session.user?.name} />

          <div className="flex flex-col gap-2">
            {/* @ts-ignore */}
            <HabitToCompleteSummary subscriptions={session?.user?.subs} />
            <CountdownHabit />
          </div>
        </div>

        <div className="max-w-md md:max-w-7xl">
          <h1 className="font-bold text-slate-950 text-lg mb-2 font-heading px-4">
            Your Habits
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
