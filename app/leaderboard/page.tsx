import { Navigator } from "@/components/Navigator";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUsers } from "@/libs/helpers";
import Header from "@/components/Header";
import Image from "next/image";
import { TopUser } from "@/components/TopUser";
import { TopUsers } from "@/components/TopUsers";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const { data } = await getUsers();

  console.log({ data });

  const [first, second, third, ...users] = data;

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-100 flex-col justify-between">
        <div className="mt-12 p-6">
          <TopUsers first={first} second={second} third={third} />
        </div>
        <div className="p-6 flex gap-4 flex-col bg-slate-50 mb-10 rounded-t-3xl overflow-y-auto max-h-96">
          {users.map((user, index) => (
            <div className="flex gap-2  items-center" key={user.email}>
              <p className="font-semibold">#{index + 4}</p>
              <Image
                src={user.img || ""}
                width={50}
                height={50}
                className="rounded-full"
                alt="User profile picture"
              />
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-slate-500 text-sm">{user.points} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Navigator />
    </>
  );
}
