import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Camera } from "@/components/Camera/Camera";
import { SubFeatures } from "@/components/Info/SubFeatures";
import { getHabit } from "@/prisma/helpers";

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
      <h1>user profile</h1>
    </>
  );
}
