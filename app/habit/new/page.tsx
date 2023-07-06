import { Navigator } from "@/components/Navigator";
import { HabitCard } from "@/components/HabitCard";
import { getHabits } from "@/prisma/helpers";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserWelcome } from "@/components/UserWelcome";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const { data: habits, error } = await getHabits();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <main className="flex flex-col gap-8 container mx-auto px-4">
        <UserWelcome />
        <div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for a habit"
            className="bg-slate-200 rounded-md w-full p-4 text-sm"
          />
        </div>

        <div className="max-w-md">
          <h1 className="font-bold text-slate-950 text-2xl mb-4">Habits</h1>
          <div className="overflow-x-auto">
            <div className="flex flex-row gap-4">
              {habits.map((habit) => (
                <Link
                  href={`/habit/${habit.name}`}
                  key={habit.name}
                  passHref
                  legacyBehavior
                >
                  <HabitCard
                    minutes={habit.minutes}
                    title={habit.title}
                    src={habit.img}
                    habitName={habit.name}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Navigator />
    </>
  );
}
