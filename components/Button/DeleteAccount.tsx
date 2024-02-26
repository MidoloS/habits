"use client";

import { signOut } from "next-auth/react";

export const DeleteAccount = () => {
  const handleDeleteUser = async () => {
    await fetch("/api/user/delete");
    signOut({ callbackUrl: "/" });
  };
  return (
    <button className="text-zinc-500 underline" onClick={handleDeleteUser}>
      Delete Account
    </button>
  );
};
