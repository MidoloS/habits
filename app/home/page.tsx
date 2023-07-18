import { Navigator } from "@/components/Navigator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { UserHabits } from "@/components/UserHabits";
import { UserWelcome } from "@/components/UserWelcome";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  return (
    <>
      <main className="flex flex-col container mx-auto px-4 gap-8">
        <UserWelcome />
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
          <h1 className="font-bold text-slate-950 text-lg mb-4 font-heading">
            Your Habits
          </h1>
          <UserHabits />
        </div>
      </main>
      <Navigator />
    </>
  );
};

export default Home;
