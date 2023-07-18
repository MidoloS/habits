import { Navigator } from "@/components/Navigator";
import { HabitCard } from "@/components/HabitCard";
import { getHabits } from "@/prisma/helpers";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserWelcome } from "@/components/UserWelcome";
import { HabitList } from "@/components/HabitList";

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
      <main className="flex flex-col container mx-auto px-4 gap-8">
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

        <div className="max-w-md md:max-w-7xl">
          <h1 className="font-bold text-slate-950 text-lg mb-4 font-heading">
            Habits
          </h1>
          <HabitList habits={habits} urlPattern="/habit/{habitName}" />
        </div>
      </main>
      <Navigator />
    </>
  );
}
