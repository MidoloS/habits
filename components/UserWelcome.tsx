"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { SignOutButton } from "./Button/Logout";

export const UserWelcome = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  return (
    <figure className="flex gap-4 mt-8 justify-between">
      <div className="flex items-center gap-4">
        <Image
          // @ts-ignore
          src={session?.user?.image}
          width={55}
          height={55}
          alt={""}
          className="rounded-full"
        />
        <figcaption>
          <p className="text-xs text-slate-500 font-sans">Hi,</p>
          <h2 className="text-slate-900 text-sm font-medium font-heading">
            {session.user?.name}
          </h2>
        </figcaption>
      </div>
      <div>
        <SignOutButton />
      </div>
    </figure>
  );
};
