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

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const { data: users } = await getUsers();

  console.log({ session });

  return (
    <>
      <Header />
      <div className="relative w-full">
        <Image
          className="h-full w-full"
          src="/leaderboard.png"
          alt="leaderboard"
          height={300}
          width={252}
        />

        <div
          className="
      absolute bottom-0 flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-t from-black to-transparent
      "
        >
          <figure className="text-center w-full flex flex-col justify-center items-center h-full gap-4 mt-8">
            <Image
              className="rounded-full border-2 border-slate-100 p-1"
              src={session?.user?.image || "/default_user.png"}
              height={100}
              width={100}
              alt="user profile picture"
            />
            <div>
              <figcaption className="text-slate-200 font-medium">
                {session?.user?.name}
              </figcaption>
              <figcaption className="text-slate-500 text-sm">
                {/* @ts-ignore */}
                Lvl {pointsToLevel(session?.user?.points)} • {/* @ts-ignore */}
                {session?.user?.points} xp
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 max-h-96 overflow-y-auto">
        {users.map((user, rank) => (
          <div
            className="flex items-center justify-between gap-4"
            key={user.email}
          >
            <div className="flex items-center gap-4">
              <Image
                className="rounded-full"
                src={user.img || "/default_user.png"}
                width={70}
                height={70}
                alt="user profile picture"
              />
              <div className="flex flex-col">
                <h1 className="text-slate-950 font-medium">{user.name}</h1>
                <p className="text-sm text-slate-500">
                  Lvl {pointsToLevel(user.points)} • {user.points} xp
                </p>
              </div>
            </div>
            <div>
              <p className="font-bold">#{rank + 1}</p>
            </div>
          </div>
        ))}
      </div>
      <Navigator />
    </>
  );
}
