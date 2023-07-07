"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const SWAP_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21.203"
    viewBox="0 0 21 21.203"
  >
    <g id="refresh_2_" data-name="refresh (2)" transform="translate(-2.461)">
      <path
        id="Path_88"
        data-name="Path 88"
        d="M5.086,9.439A7.957,7.957,0,0,1,18.131,4.551L17.1,5.577a.88.88,0,0,0,.622,1.5h4.037a.88.88,0,0,0,.88-.88V2.162a.88.88,0,0,0-1.5-.622L20,2.684A10.586,10.586,0,0,0,2.479,9.054a1.318,1.318,0,1,0,2.608.385Z"
        transform="translate(0 0)"
      />
      <path
        id="Path_89"
        data-name="Path 89"
        d="M41.1,256.891a1.334,1.334,0,0,0-1.308,1.162,7.957,7.957,0,0,1-13.044,4.888l1.026-1.026a.88.88,0,0,0-.622-1.5H23.115a.88.88,0,0,0-.88.88v4.037a.88.88,0,0,0,1.5.622l1.144-1.144A10.585,10.585,0,0,0,42.4,258.439a1.333,1.333,0,0,0-1.3-1.548Z"
        transform="translate(-18.958 -246.29)"
      />
    </g>
  </svg>
);

export const SwapCamera = () => {
  const [facing, setFacing] = useState("user");
  const path = usePathname();

  if (!path) return null;

  const handleToggle = () => {
    const newFacing = facing === "user" ? "environment" : "user";

    setFacing(newFacing);
  };

  return (
    <Link
      href={`${path}?facing=${facing}`}
      className="border-slate-950 border-2 rounded-xl h-14 w-14 flex items-center justify-center"
      onClick={handleToggle}
    >
      {SWAP_ICON}
    </Link>
  );
};
