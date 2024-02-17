import Image from "next/image";

import { formatName } from "@/libs/helpers";
import { FC } from "react";
import { User } from "@prisma/client";

type Props = {
  user: User;
  rank?: number;
  currentUser: boolean;
};

export const LeaderboardItem: FC<Props> = ({ user, rank, currentUser }) => {
  console.log({ user, currentUser });

  return (
    <li className="flex items-center justify-between border-b border-slate-200 p-3 py-4">
      <figure className="flex items-center gap-4 justify-center">
        <figcaption className="subheading-1 gap-4">
          {rank ? rank : "###"}
        </figcaption>
        <Image
          className="rounded-full"
          src={user.img || "/default_user.png"}
          width={40}
          height={40}
          alt="user profile picture"
        />
        <div className="flex flex-col gap-1">
          <figcaption className="font-medium">
            {formatName(user.name, currentUser)}
          </figcaption>
          <figcaption className="text-slate-500 text-sm">
            {user.points} Points
          </figcaption>
        </div>
      </figure>
    </li>
  );
};
