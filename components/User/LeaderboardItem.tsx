import Image from "next/image";

import { formatName } from "@/libs/helpers";
import { FC } from "react";
import { User } from "@prisma/client";
import Link from "next/link";

type Props = {
  user: User;
  rank?: number;
  currentUser: boolean;
};

export const LeaderboardItem: FC<Props> = ({ user, rank, currentUser }) => {
  return (
    <li className="flex items-center justify-between border-zinc-600 border px-6 py-4 rounded-xl bg-zinc-900">
      <figure className="flex items-center gap-4 justify-center">
        <figcaption className="subheading-1 gap-4 text-zinc-50">
          {rank ? rank : "###"}
        </figcaption>
        <Image
          className="rounded-full"
          src={user.img || "/default_user.png"}
          width={45}
          height={45}
          alt="user profile picture"
        />
        <div className="flex flex-col gap-1">
          <Link href={`/user/${user.id}`} className="font-medium text-zinc-50">
            {formatName(user.name, currentUser)}
          </Link>
          <figcaption className="text-zinc-400 text-sm">
            {user.points} Points
          </figcaption>
        </div>
      </figure>
    </li>
  );
};
