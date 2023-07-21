import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SwapCamera } from "@/components/Button/SwapCamera";
import { Camera } from "@/components/Camera";
import { Features } from "@/components/Info/Features";
import { getHabit } from "@/prisma/helpers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const { data: habit } = await getHabit(name);

  if (!habit?.createdAt) {
    return <h1>Habit not found</h1>;
  }

  return (
    <>
      <div className="flex flex-col  w-screen h-screen relative justify-end">
        <main className="bg-slate-50 w-full rounded-3xl">
          <div className="container mx-auto p-6 flex flex-col justify-end h-full  gap-4 ">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold font-heading">
                  {habit.title}
                </h1>
                <p className="text-sm text-slate-500">We will Validate</p>
              </div>
              <div>
                <SwapCamera />
              </div>
            </div>
            <div className="flex flex-row justify-between text-center">
              <Features habit={habit} />
            </div>
            <Camera habitName={habit.name} />
          </div>
        </main>
      </div>
    </>
  );
}
