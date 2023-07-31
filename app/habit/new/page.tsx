import { Navigator } from "@/components/Navigator";
import { HabitCard } from "@/components/HabitCard";
import { getHabits } from "@/prisma/helpers";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserWelcome } from "@/components/UserWelcome";
import { HabitList } from "@/components/HabitList";
import { SearchInput } from "@/components/SearchInput";

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
      <main className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <UserWelcome img={session.user?.image} name={session.user?.name} />
        </div>
        <div>
          <h1 className="font-bold text-slate-950 text-lg mb-2 font-heading">
            Habits
          </h1>
          <HabitList habits={habits} urlPattern="/habit/{habitName}" />
        </div>
      </main>
      <Navigator />
    </>
  );
}
