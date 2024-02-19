import Image from "next/image";
import { FC } from "react";

type Props = {
  src: string | null;
  title: string;
  suffix?: React.ReactNode | null;
  subtitle: number | string;
  habitName: string;
};
export const HabitCard: FC<Props> = ({ subtitle, src, title, suffix }) => {
  return (
    <figure className="relative w-full cursor-pointer">
      <Image
        className="rounded-xl h-full w-full"
        src={src || "default"}
        alt={title}
        height={180}
        width={320}
      />
      <div className="absolute top-0 right-0 p-4">{suffix}</div>

      <div
        className="
      absolute bottom-0 flex w-full items-end justify-between rounded-xl backGradient  h-full px-7 py-5
      "
      >
        <div className="w-full">
          <figcaption className="text-lg font-bold mb-1 text-white">
            {title}
          </figcaption>
          <figcaption className="font-medium text-slate-300 font-sans">
            {subtitle}
          </figcaption>
        </div>
      </div>
    </figure>
  );
};
