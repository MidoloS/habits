import { Navigator } from "@/components/Navigator/Navigator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { UserHabits } from "@/components/Habit/UserList";
import { UserWelcome } from "@/components/User/Welcome";
import { EmptyHabit } from "@/components/Habit/Empty";
import { HabitToCompleteSummary } from "@/components/Habit/ToCompleteSummary";
import { CountdownHabit } from "@/components/Habit/Countdown";
import { EnableNotification } from "@/components/Modal/EnableNotification";
import Image from "next/image";
import { PrimaryButton } from "@/components/Button/Primary";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/home");
  }

  if (session?.user?.subs.length === 0) {
    return (
      <>
        <main className="flex flex-col gap-8 px-4 mt-4 justify-between h-[87vh] ">
          <div />
          <div className="text-center flex flex-col items-center gap-8">
            <Image
              src="/images/empty.png"
              width={300}
              height={300}
              alt=""
              style={{ borderRadius: 12 }}
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold">Nothing here</h1>
              <h2 className="text-slate-500 font-sans">
                Begin your journey finding new habits
              </h2>
            </div>
          </div>
          <PrimaryButton size="lg">Find Habits</PrimaryButton>
        </main>
        <Navigator />
      </>
    );
  }

  return (
    <>
      <EnableNotification />
      <main className="flex flex-col gap-8 p-7 container mx-auto">
        <div className="flex flex-col gap-8">
          <UserWelcome img={session.user?.image} name={session.user?.name} />

          <div className="flex flex-col gap-2">
            <HabitToCompleteSummary subscriptions={session?.user?.subs} />
            <CountdownHabit />
          </div>
        </div>

        <div>
          <h1 className="subheading-1 mb-4">TODAYS HABITS</h1>
          {/* @ts-ignore */}
          <UserHabits />
        </div>
      </main>
      <Navigator />
    </>
  );
};

export default Home;
