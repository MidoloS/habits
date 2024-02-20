"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export const GoogleSignInButton = () => {
  return (
    <button
      onClick={async () => {
        await signIn("google", { redirect: true, callbackUrl: "/home" });
        redirect("/home");
      }}
      className="text-zinc-50 font-medium"
    >
      Sign In
    </button>
  );
};
