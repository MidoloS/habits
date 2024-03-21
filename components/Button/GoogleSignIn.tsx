"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export const GoogleSignInButton = ({ text = "Sign In" }: { text?: string }) => {
  return (
    <button
      onClick={async () => {
        await signIn("google", { redirect: true, callbackUrl: "/home" });
        redirect("/");
      }}
      className="z-20 bg-zinc-900 text-sm border border-zinc-700 w-fit px-8 py-3 text-white rounded-md"
    >
      {text}
    </button>
  );
};
