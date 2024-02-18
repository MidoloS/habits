import Image from "next/image";
import { SignOutButton } from "../Button/Logout";
import { FC } from "react";

type Props = {
  name: string | null | undefined;
  img: string | null | undefined;
};

export const UserWelcome: FC<Props> = ({ name, img }) => {
  return (
    <figure className="flex gap-4 justify-between mt-2">
      <div className="flex items-center gap-4">
        <Image
          src={img || "/default_user.png"}
          width={55}
          height={55}
          alt={""}
          className="rounded-full"
        />
        <figcaption>
          <p className="text-xs text-zinc-500">Hi,</p>
          <h2 className="text-zinc-50 font-semibold">{name}</h2>
        </figcaption>
      </div>
      <div>
        <SignOutButton />
      </div>
    </figure>
  );
};
