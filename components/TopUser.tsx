import { User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

type Props = {
  user: User;
  size: number;
};

const formatName = (name: string) => {
  const [firstName, lastName] = name.split(" ");

  return `${firstName}. ${lastName[0]}`;
};

export const TopUser: FC<Props> = ({ user, size }) => (
  <figure className="flex flex-col justify-center items-center">
    <Image
      src={user.img || ""}
      width={size}
      height={size}
      alt="User profile picture"
      className="rounded-full border-2 border-slate-950 p-0.5"
    />
    <figcaption className="text-center font-medium">
      {formatName(user.name)}
    </figcaption>
    <figcaption className="text-center text-slate-500 text-sm">
      {user.points} pts
    </figcaption>
  </figure>
);
