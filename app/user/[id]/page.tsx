import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserWelcome } from "@/components/User/Welcome";
import { Navigator } from "@/components/Navigator/Navigator";

import { DeleteAccount } from "@/components/Button/DeleteAccount";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/?callbackUrl=/home`);
  }

  console.log({ session });

  return (
    <>
      <main className="flex flex-col gap-8 p-7 container mx-auto">
        <UserWelcome img={session?.user?.image} name={session?.user?.name} />
        <div>
          <DeleteAccount />
        </div>
      </main>
      <Navigator userId={session?.user?.id} />
    </>
  );
}
