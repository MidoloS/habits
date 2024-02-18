import { formatName } from "@/libs/helpers";
import { User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

type Props = {
  user: User;
  size: number;
  currentUser: boolean;
};

export const TopUser: FC<Props> = ({ user, size, currentUser }) => {
  console.log({ user, currentUser });

  return (
    <figure className="flex flex-col justify-center items-center">
      <Image
        src={user?.img || ""}
        width={size}
        height={size}
        alt="User profile picture"
        className="rounded-full border-[3px] border-slate-950 p-[3px]"
      />
      <figcaption className="text-center text-zinc-50 font-medium">
        {formatName(user?.name, currentUser)}
      </figcaption>
      <figcaption className="text-center text-zinc-500 text-sm">
        {user?.points || 0} Points
      </figcaption>
    </figure>
  );
};
