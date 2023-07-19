import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrimaryButton } from "@/components/Button/Primary";
import { SwapCamera } from "@/components/Button/SwapCamera";
import { Camera } from "@/components/Camera";
import { Features } from "@/components/Info/Features";
import { getSubscription } from "@/libs/helpers";
import { getHabit } from "@/prisma/helpers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const session = await getServerSession(authOptions);

  console.log("name", name, session);

  // getSubscription(name).then((res) => console.log("pepe123", res));

  console.log("sub", "sub");

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const sub = await getSubscription(name);

  console.log({ sub });

  if (!sub) {
    return <h1>Subscription not found</h1>;
  }

  if (!sub.habit.data?.createdAt) {
    return <h1>Habit not found</h1>;
  }

  // const submitText = sub.completedAt ? "Completed" : "Complete";
  const submitText = "ok";

  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-end">
        <main className="z-10 bottom-0 bg-slate-50 w-full rounded-3xl">
          <div className="container mx-auto p-6 flex flex-col h-full gap-4 ">
            <div className="flex justify-between items-center">
              <div>
                {/* <h1 className="text-lg font-bold">{habit.data.title}</h1> */}
                <p className="text-sm text-slate-500">We will Validate</p>
              </div>
              <div>
                <SwapCamera />
              </div>
            </div>
            <div className="flex flex-row justify-between text-center">
              {/* <Features habit={habit.data} /> */}
            </div>
            <Camera />
          </div>
        </main>
      </div>
    </>
  );
}
