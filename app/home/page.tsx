import { Navigator } from "@/components/Navigator/Navigator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { UserHabits } from "@/components/Habit/UserList";
import { UserWelcome } from "@/components/User/Welcome";
import { HabitToCompleteSummary } from "@/components/Habit/ToCompleteSummary";
import { CountdownHabit } from "@/components/Habit/Countdown";
import Image from "next/image";
import Link from "next/link";
import { NotificationRedirect } from "@/components/Info/NotificationRedirect";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/home");
  }

  if (session?.user?.subs.length === 0) {
    return (
      <>
        <main className="flex flex-col gap-8 p-7 justify-between h-[90vh] container mx-auto">
          <div>
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
              <h1 className="text-2xl font-semibold text-zinc-50">
                Nothing here
              </h1>
              <h2 className="text-zinc-500 text-center">
                Begin your journey finding new habits
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Link
              className="bg-zinc-50 text-zinc-950 font-medium font-sans text-center rounded-xl px-5 py-4 w-full md:w-fit"
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
      <div className="bg-gradient-to-t from-zinc-900 to-zinc-950 items-center">
        <main className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 py-6 border-b border-zinc-600">
            <div className="flex flex-col gap-8 container mx-auto px-5">
              <UserWelcome
                img={session.user?.image}
                name={session.user?.name}
              />

              <div className="flex flex-col gap-4">
                <NotificationRedirect userId={session?.user?.id} />

                <HabitToCompleteSummary subscriptions={session?.user?.subs} />
                <CountdownHabit />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-5">
            <h1 className="subheading-1 mb-4">TODAYS HABITS</h1>
            {/* @ts-ignore */}
            <UserHabits />
          </div>
        </main>
      </div>
      <Navigator userId={session?.user?.id} />
    </>
  );
};

export default Home;
