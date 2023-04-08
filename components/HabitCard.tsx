import Image from "next/image";
import { FC, forwardRef } from "react";

type Props = {
  src: string;
  title: string;
  suffix?: React.ReactNode;
  width?: number;
  height?: number;
  minutes: number;
};
export const HabitCard: FC<Props> = forwardRef(
  // @ts-ignore
  ({ onClick, href, ...props }, ref): JSX.Element => {
    const {
      src,
      title,
      suffix,
      width = 400,
      height = 400,
      minutes = 5,
    } = props;
    return (
      // @ts-ignore
      <a href={href} onClick={onClick} ref={ref}>
        <figure className="w-full ">
          <div className="relative w-full">
            <Image
              className="rounded-xl"
              src={src}
              alt={title}
              width={width}
              height={height}
            />
            <div
              className="
      absolute bottom-0 flex w-full items-center justify-between rounded-xl bg-gradient-to-t from-black to-transparent px-7 py-5
      "
            >
              <figcaption>
                <h3 className="text-md mb-1 text-white">{title}</h3>
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
