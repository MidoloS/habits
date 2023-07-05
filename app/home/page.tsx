import { HabitCard } from "@/components/HabitCard";
import { Completed } from "@/components/Completed";
import Link from "next/link";
import { Navigator } from "@/components/Navigator";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getSubscriptions } from "@/libs/helpers";

// @ts-ignore
const Home = async () => {
  const session = await getServerSession(authOptions);

  const subscriptions = await getSubscriptions();

  console.log({ session });

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  //   const { login, profile } = useUser();

  const profile = {
    name: "Sebastian",
    picture: "",
  };

  // no anda
  return (
    <>
      <main className="flex flex-col container mx-auto px-4 gap-8">
        <figure className="flex items-center gap-4 mt-8">
          <Image
            // @ts-ignore
            src={profile?.picture}
            width={70}
            height={70}
            alt={""}
            className="rounded-full"
          />
          <figcaption>
            <p className="text-sm text-slate-500">Welcome</p>
            {/* @ts-ignore */}
            <h2 className="text-slate-900 font-bold">{profile?.name}</h2>
          </figcaption>
        </figure>
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
          <h1 className="font-bold text-slate-950 text-2xl mb-4">
            Your Habits
          </h1>
          <div className="overflow-x-auto">
            <div className="flex flex-row gap-4">
              {subscriptions.map((sub: any) => (
                <Link
                  href={`/habit/${sub.habit.name}/scan`}
                  key={sub.habit.name}
                  passHref
                  legacyBehavior
                >
                  <HabitCard
                    minutes={20}
                    habitName={sub.habit.name}
                    title={sub.habit.title}
                    suffix={<Completed completed={!!sub.completedAt} />}
                    src={sub.habit.img}
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
};

export default Home;
