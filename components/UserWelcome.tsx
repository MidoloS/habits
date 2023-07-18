"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export const UserWelcome = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  return (
    <figure className="flex items-center gap-4 mt-8">
      <Image
        // @ts-ignore
        src={session?.user?.image}
        width={60}
        height={60}
        alt={""}
        className="rounded-full"
      />
      <figcaption>
        <p className="text-sm text-slate-500">Welcome</p>
        <h2 className="text-slate-900 font-bold">{session.user?.name}</h2>
      </figcaption>
    </figure>
  );
};
