import { Navigator } from "@/components/Navigator/Navigator";
import { getHabits } from "@/prisma/helpers";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { UserWelcome } from "@/components/User/Welcome";
import { HabitList } from "@/components/Habit/List";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/habit/new");
  }

  const { data: habits, error } = await getHabits();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <main className="flex flex-col gap-6 p-7 container mx-auto">
        <div className="flex flex-col gap-8">
          <UserWelcome img={session.user?.image} name={session.user?.name} />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-3">Add Habit</h1>
          <h2 className="subheading-1 mb-4">AVAILABLE HABITS</h2>
          <HabitList habits={habits} urlPattern="/habit/{habitName}" />
        </div>
      </main>
      <Navigator />
    </>
  );
}
