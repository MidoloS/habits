import { PrimaryButton } from "@/components/Button/Primary";
import { Camera } from "@/components/Camera";
import { Features } from "@/components/Features";
import { getHabit } from "@/prisma/helpers";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const habit = await getHabit(name);

  if (!habit.data?.createdAt) {
    return <h1>Habit not found</h1>;
  }

  return (
    <>
      <div className="flex flex-col">
        <figure className="w-full">
          <Camera />
        </figure>
        <main className="z-10 bottom-0 absolute bg-slate-50 w-full rounded-3xl">
          <div className="container mx-auto p-6 flex flex-col h-full gap-4 ">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">{habit.data.title}</h1>
                <p className="text-sm text-slate-500">We will Validate</p>
              </div>
            </div>
            <div className="flex flex-row justify-between text-center">
              <Features habit={habit.data} />
            </div>
            <PrimaryButton>Submit</PrimaryButton>
          </div>
        </main>
      </div>
    </>
  );
}
