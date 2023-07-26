import { User } from "@prisma/client";
import { FC } from "react";
import { TopUser } from "./TopUser";

type Props = {
  first: User;
  second: User;
  third: User;
};

export const TopUsers: FC<Props> = ({ first, second, third }) => (
  <div className="flex p-6 justify-between w-full">
    <TopUser size={70} user={second} />
    <TopUser size={90} user={first} />
    <TopUser size={70} user={third} />
  </div>
);
