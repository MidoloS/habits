import { Navigator } from "@/components/Navigator";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUsers } from "@/libs/helpers";
import Header from "@/components/Header";
import Image from "next/image";
import { TopUser } from "@/components/TopUser";
import { TopUsers } from "@/components/TopUsers";

const pointsToLevel = (points: number) => {
  const boost = 0.5;
  return Math.floor(boost * Math.sqrt(points));
};

const formatName = (name: string) => {
  const [first, last] = name.split(" ");
  return `${first}. ${last[0]}`;
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const { data: users } = await getUsers();

  console.log({ session });

  const [first, second, third, ...otherUsers] = users;

  return (
    <>
      <Header />

      <div className="px-7 py-4">
        <div className="mt-20 mb-4 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <h2 className="text-slate-400 font-medium text-sm tracking-wide ">
            TOP 3 RANKERS
          </h2>
        </div>

        <div className="flex justify-around">
          <div className="flex flex-col justify-center items-center">
            <Image
              className="rounded-full border-[3px] border-slate-950 p-[3px]"
              src={second.img || "/default_user.png"}
              width={70}
              height={70}
              alt="user profile picture"
            />
            <p className="font-medium mt-2 mb-1">{formatName(second.name)}</p>
            <p className="text-xs text-slate-400 font-medium">
              {second.points}pts
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              className="rounded-full border-[3px] border-slate-950  p-[3px]"
              src={first.img || "/default_user.png"}
              width={100}
              height={100}
              alt="user profile picture"
            />
            <p className="font-medium mt-2 mb-1">{formatName(first.name)}</p>
            <p className="text-xs text-slate-400 font-medium">
              {first.points}pts
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              className="rounded-full border-[3px] border-slate-950 p-[3px]"
              src={third.img || "/default_user.png"}
              width={70}
              height={70}
              alt="user profile picture"
            />
            <p className="font-medium mt-2 mb-1">{formatName(third.name)}</p>
            <p className="text-xs text-slate-400 font-medium">
              {third.points}pts
            </p>
          </div>
        </div>
      </div>
      <div className="p-7 flex flex-col  max-h-[30rem]">
        <h2 className="text-slate-400 font-medium mb-2 text-sm tracking-wide gap-4">
          ALL RANKERS
        </h2>
        <div className="overflow-y-auto flex flex-col gap-4 mt-4 max-h-[40rem]">
          {otherUsers.map((user, rank) => (
            <div
              className="flex items-center justify-between gap-4 shadow-sm rounded-lg bg-white p-3"
              key={user.email}
            >
              <div className="flex items-center gap-4">
                <Image
                  className="rounded-full"
                  src={user.img || "/default_user.png"}
                  width={50}
                  height={50}
                  alt="user profile picture"
                />
                <div className="flex flex-col">
                  <h1 className="text-slate-950 font-medium">{user.name}</h1>
                  <p className="text-xs text-slate-400 font-medium">
                    {user.points}pts
                  </p>
                </div>
              </div>
              <div>
                <p className="font-bold">#{rank + 4}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Navigator />
    </>
  );
}
