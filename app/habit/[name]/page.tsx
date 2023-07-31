import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FollowButton } from "@/components/Button/Follow";
import { Modal } from "@/components/Button/Modal";
import { HabitFeatures } from "@/components/Info/HabitFeatures";
import { getHabit, getUserHabits } from "@/prisma/helpers";
import { getServerSession } from "next-auth";
import Image from "next/image";
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

  const { data: habit, error } = await getHabit(name);

  if (error) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col">
        <figure className="w-full">
          <Image
            alt={name}
            height={677}
            width={452}
            src={habit.tallImage || "/images/placeholder.png"}
            className="md:rounded-xl"
          />
        </figure>
        <main className="z-10 bottom-0 absolute bg-slate-50 w-full rounded-3xl">
          <div className="container mx-auto p-6 flex flex-col h-full gap-4 ">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold">{habit.title}</h1>
                <p className="text-sm font-sans text-slate-500">
                  {habit.subtitle}
                </p>
              </div>
              <FollowButton habitName={habit.name} />
            </div>
            <div className="flex flex-row justify-between text-center">
              <HabitFeatures habit={habit} />
            </div>
            <Modal
              buttonText="About benefits"
              title={`Benefits of ${habit.title}`}
              description="wea"
            />
          </div>
        </main>
      </div>
    </>
  );
}
