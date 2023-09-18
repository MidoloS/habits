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
import Link from "next/link";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/home");
  }

  if (session?.user?.subs.length === 0) {
    return (
      <>
        <main className="flex flex-col gap-8 p-7 justify-between h-[90vh] ">
          <div className="flex items-center gap-2 ">
            <Image
              src="/icon-192x192.png"
              alt="wonderful big tree vectorial design"
              height={50}
              width={50}
            />
            <p className="font-heading font-semibold text-slate-950">HabitAI</p>
          </div>
          <div className="text-center flex flex-col items-center gap-8 justify-center ">
            <Image
              src="/images/empty.png"
              width={300}
              height={300}
              alt=""
              style={{ borderRadius: 12 }}
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold">Nothing here</h1>
              <h2 className="text-slate-600 text-center text-sm">
                Begin your journey finding new habits
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Link
              className="bg-slate-950 text-slate-50 font-medium font-sans text-center text-sm rounded-xl px-5 py-4"
              href="/habit/new"
            >
              Find Habits
            </Link>
          </div>
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
