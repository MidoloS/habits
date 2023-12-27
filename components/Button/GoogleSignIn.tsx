"use client";

import { signIn } from "next-auth/react";
import { PrimaryButton } from "./Primary";

export const GoogleSignInButton = () => {
  return (
    <PrimaryButton
      onClick={() => signIn("google", { redirect: true, callbackUrl: "/home" })}
      size="lg"
    >
      Join Now
    </PrimaryButton>
  );
};
