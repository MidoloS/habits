import Image from "next/image";
import { FC, forwardRef } from "react";

type Props = {
  src: string | null;
  title: string;
  suffix?: React.ReactNode;
  minutes: number;
};
export const HabitCard: FC<Props> = forwardRef(
  // @ts-ignore
  ({ onClick, href, ...props }, ref): JSX.Element => {
    const { src = "", title, suffix, minutes = 5 } = props;
    return (
      // @ts-ignore
      <a href={href} onClick={onClick} ref={ref}>
        <figure className="w-full">
          <div className="relative h-56">
            <Image
              className="rounded-xl"
              src={src || "/images/placeholder.png"}
              alt={title}
              fill={true}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
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
          </div>
        </figure>
      </a>
    );
  }
);

HabitCard.displayName = "HabitCard";
