import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
// import { GoogleLogin } from "@react-oauth/google";

const Index = async () => {
  const session = await getServerSession(authOptions);

  console.log({ session });

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  redirect("/home");
};
export default Index;
