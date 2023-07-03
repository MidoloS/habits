import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  src: string | null;
  title: string;
  suffix?: React.ReactNode;
  minutes: number;
  habitName: string;
};
export const HabitCard: FC<Props> = ({ minutes, src, title, suffix }) => {
  return (
    <figure className="relative w-full min-w-[300px]  cursor-pointer max-h-96">
      <Image
        className="rounded-xl h-full w-full"
        src={src || "default"}
        alt={title}
        height={877}
        width={252}
      />
      <div
        className="
      absolute bottom-0 flex w-full items-center justify-between rounded-xl bg-gradient-to-t from-black to-transparent px-7 py-5
      "
      >
        <figcaption>
          <h3 className="text-sm mb-1 text-white">{title}</h3>
          <p className="font-bold text-xl text-white">{minutes} mins</p>
        </figcaption>
        {suffix}
      </div>
    </figure>
  );
};
