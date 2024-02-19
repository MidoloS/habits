"use client";

import { signIn } from "next-auth/react";
import { PrimaryButton } from "./Primary";
import { redirect } from "next/navigation";

export const GoogleSignInButton = () => {
  return (
    <PrimaryButton
      onClick={async () => {
        await signIn("google", { redirect: true, callbackUrl: "/home" });
        redirect("/home");
      }}
      size="lg"
      fullWidth={false}
    >
      Sign In
    </PrimaryButton>
  );
};
