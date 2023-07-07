"use client";

import {
  getSubscription,
  subscribeToHabit,
  unsubscribeToHabit,
} from "@/libs/helpers";
import { FC, useEffect, useState } from "react";

type Props = {
  habitName: string;
};

export const FollowButton: FC<Props> = ({ habitName }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  useEffect(() => {
    console.log("weador");

    getSubscription(habitName)
      .then((sub) => {
        console.log("subs", sub.data);

        setIsFollowing(!!sub.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const text = isFollowing ? "Following" : "Follow";

  const handleClick = () => {
    if (isFollowing) {
      unsubscribeToHabit(habitName);
    } else {
      subscribeToHabit(habitName);
    }
    setIsFollowing((prev) => !prev);
  };

  const style = isFollowing
    ? "bg-slate-950 text-slate-50"
    : "border-slate-900 text-slate-900 border-2";

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14.61"
      height="10.547"
      viewBox="0 0 14.61 10.547"
      className="mr-2"
    >
      <g id="check" transform="translate(0 -70.573)">
        <path
          id="Path_22"
          data-name="Path 22"
          d="M4.717,81.12a1.561,1.561,0,0,1-1.105-.458L.27,77.321a.921.921,0,0,1,0-1.3h0a.921.921,0,0,1,1.3,0l3.145,3.145,8.321-8.321a.921.921,0,0,1,1.3,0h0a.921.921,0,0,1,0,1.3L5.823,80.662A1.561,1.561,0,0,1,4.717,81.12Z"
          transform="translate(0 0)"
          fill="#f8fafc"
        />
      </g>
    </svg>
  );

  return (
    <button
      className={`font-medium text-sm rounded-xl px-5 py-3 ${style} duration-500 inline-flex items-center h-fit`}
      onClick={handleClick}
    >
      {isFollowing && icon}
      {text}
    </button>
  );
};
