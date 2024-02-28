import { formatName } from "@/libs/helpers";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  user: User;
  size: number;
  currentUser: boolean;
};

export const TopUser: FC<Props> = ({ user, size, currentUser }) => {
  if (!user) {
    return null;
  }

  if (!user?.id) {
    return null;
  }

  return (
    <figure className="flex flex-col justify-center items-center">
      <Image
        src={user?.img || ""}
        width={size}
        height={size}
        alt="User profile picture"
        className="rounded-full border-[3px] border-zinc-50 p-[3px]"
      />
      <Link
        href={`/user/${user.id}`}
        className="text-center text-zinc-50 font-medium"
      >
        {formatName(user?.name, currentUser)}
      </Link>
      <figcaption className="text-center text-zinc-500 text-sm">
        {user?.points || 0} Points
      </figcaption>
    </figure>
  );
};
