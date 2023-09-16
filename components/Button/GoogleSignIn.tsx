"use client";

import { signIn } from "next-auth/react";
import { PrimaryButton } from "./Primary";

export const GoogleSignInButton = () => {
  return (
    <PrimaryButton
      onClick={() => signIn("google", { callbackUrl: "/home" })}
      size="lg"
    >
      Create Account
    </PrimaryButton>
  );
};
