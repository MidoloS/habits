"use client";

import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
// import { GoogleLogin } from "@react-oauth/google";

const Index = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = () => {
    console.log("error");
  };
  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
    </div>
  );
};
export default Index;
