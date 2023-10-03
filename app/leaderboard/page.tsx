import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Navigator } from "@/components/Navigator/Navigator";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUsers } from "@/libs/helpers";
import { Header } from "@/components/Navigator/Header";
import { TopUser } from "@/components/User/TopUser";
import { LeaderboardItem } from "@/components/User/LeaderboardItem";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/leaderboard");
  }

  const { data: users } = await getUsers();

  const currentUser = {
    name: session.user.name,
    email: session.user.email,
    img: session.user.image,
    points: session.user.points,
    isPro: session.user.isPro,
  };

  const [first, second, third, ...otherUsers] = users;

  const currentUserIsOnTopTen = users.some(
    (user) => user.email === currentUser.email
  );

  return (
    <>
      <Header />

      <div className="px-7 py-4">
        <div className="mt-24 mb-4 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <h2 className="subheading-1">TOP 3 RANKERS</h2>
        </div>

        <div className="flex justify-between items-end">
          <TopUser
            user={second}
            size={80}
            currentUser={currentUser.email === second.email}
          />
          <TopUser
            user={first}
            size={100}
            currentUser={currentUser.email === first.email}
          />
          <TopUser
            user={third}
            size={60}
            currentUser={currentUser.email === third.email}
          />
        </div>
      </div>
      <div className="p-7 flex flex-col">
        <h2 className="subheading-1 mb-2 gap-4">ALL RANKERS</h2>
        <ul className="flex flex-col mt-4 mb-20">
          {otherUsers.map((user, rank) => (
            <LeaderboardItem
              user={user}
              rank={rank + 4}
              key={user.email}
              currentUser={currentUser.email === user.email}
            />
          ))}
          {!currentUserIsOnTopTen && (
            <>
              <div className="flex items-center justify-center mt-4 mb-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>

              <LeaderboardItem user={currentUser} currentUser />
            </>
          )}
        </ul>
      </div>
      <Navigator />
    </>
  );
}
