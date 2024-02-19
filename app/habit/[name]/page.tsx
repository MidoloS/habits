import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getHabit } from "@/prisma/helpers";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FollowButton } from "@/components/Button/Follow";
import { HabitFeatures } from "@/components/Info/HabitFeatures";
import { SecondaryButton } from "@/components/Button/Secondary";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/?callbackUrl=/habit/${name}`);
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
            height={777}
            width={552}
            src={habit.tallImage || "/images/placeholder.png"}
            className="md:rounded-xl relative bottom-[9vh]"
          />
        </figure>
        <main className="z-10 bottom-0 absolute bg-zinc-950 w-full rounded-t-3xl">
          <div className="mx-auto py-6 px-8 flex flex-col h-full gap-8 ">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-zinc-50">
                  {habit.title}
                </h1>
                <p className="text-sm font-sans text-zinc-400">
                  {habit.subtitle}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between text-center">
              <HabitFeatures habit={habit} />
            </div>
            <div>
              <FollowButton habitName={habit.name} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
