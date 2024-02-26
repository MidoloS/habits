import { Navigator } from "@/components/Navigator/Navigator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { UserHabits } from "@/components/Habit/UserList";
import { UserWelcome } from "@/components/User/Welcome";
import { HabitToCompleteSummary } from "@/components/Habit/ToCompleteSummary";
import { CountdownHabit } from "@/components/Habit/Countdown";
import { EnableNotification } from "@/components/Modal/EnableNotification";
import Image from "next/image";
import Link from "next/link";
import { NotificationRedirect } from "@/components/Info/NotificationRedirect";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/?callbackUrl=/home");
  }

  if (session?.user?.subs.length === 0) {
    return (
      <>
        <main className="flex flex-col gap-8 p-7 justify-between h-[90vh] ">
          <div className="container mx-auto">
            <UserWelcome name={session.user.name} img={session.user.image} />
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
              className="bg-slate-950 text-slate-50 font-medium font-sans text-center text-sm rounded-xl px-5 py-4 w-full md:w-fit"
              href="/habit/new"
            >
              Find Habits
            </Link>
          </div>
        </main>
        <Navigator userId={session?.user?.id} />
      </>
    );
  }

  console.log({ session });

  return (
    <>
      <main className="flex flex-col gap-8 p-7 container mx-auto">
        <div className="flex flex-col gap-8">
          <UserWelcome img={session.user?.image} name={session.user?.name} />

          <div className="flex flex-col gap-2">
            <NotificationRedirect userId={session?.user?.id} />

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
      <Navigator userId={session?.user?.id} />
    </>
  );
};

export default Home;
