import { Navigator } from "@/components/Navigator";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }
  return (
    <>
      <h1>Leaderboard</h1>
      <Navigator />
    </>
  );
}
