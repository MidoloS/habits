import Image from "next/image";

import { formatName } from "@/libs/helpers";
import { FC } from "react";
import { User } from "@prisma/client";

type Props = {
  user: User;
  rank: number;
};

export const LeaderboardItem: FC<Props> = ({ user, rank }) => (
  <li className="flex items-center justify-between border-b border-slate-200 p-3 py-4">
    <figure className="flex items-center gap-4 justify-center">
      <figcaption className="subheading-1 gap-4">{rank}</figcaption>
      <Image
        className="rounded-full"
        src={user.img || "/default_user.png"}
        width={40}
        height={40}
        alt="user profile picture"
      />
      <figcaption className="text-center font-medium">
        {formatName(user.name)}
      </figcaption>
      <figcaption className="text-center text-slate-500 text-sm">
        {user.points} Points
      </figcaption>
    </figure>
  </li>
);
