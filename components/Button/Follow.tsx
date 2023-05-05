"use client";

import { FC, useState } from "react";

export const FollowButton: FC = () => {
  const [following, setFollowing] = useState<boolean>(false);

  const text = following ? "Following" : "Follow";

  const handleClick = () => {
    setFollowing((prev) => !prev);
  };

  const style = following
    ? "bg-slate-900 text-slate-50"
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
      className={`font-medium rounded-xl px-5 py-2 ${style} duration-500 inline-flex items-center h-fit`}
      onClick={handleClick}
    >
      {following && icon}
      {text}
    </button>
  );
};
