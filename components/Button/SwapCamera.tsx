"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const SWAP_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <g id="refresh_2_" data-name="refresh (2)" transform="translate(-2.461)">
      <path
        id="Path_88"
        data-name="Path 88"
        d="M4.711,8.013A6.843,6.843,0,0,1,15.892,3.864l-.879.871a.742.742,0,0,0,0,1.057.758.758,0,0,0,.533.219h3.461a.751.751,0,0,0,.755-.747V1.835a.756.756,0,0,0-1.288-.528l-.981.972a9.135,9.135,0,0,0-12.811.729,8.95,8.95,0,0,0-2.2,4.679,1.133,1.133,0,0,0,.944,1.3A1.155,1.155,0,0,0,3.59,9,1.139,1.139,0,0,0,4.711,8.013Z"
      />
      <path
        id="Path_89"
        data-name="Path 89"
        d="M38.407,256.891a1.139,1.139,0,0,0-1.121.987A6.843,6.843,0,0,1,26.1,262.027l.879-.871a.742.742,0,0,0,0-1.057.758.758,0,0,0-.533-.219H22.99a.751.751,0,0,0-.755.747v3.427a.756.756,0,0,0,1.288.528l.981-.972a9.135,9.135,0,0,0,12.811-.726A8.949,8.949,0,0,0,39.52,258.2a1.14,1.14,0,0,0-1.114-1.314Z"
        transform="translate(-19.074 -247.891)"
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
      className="bg-slate-50 border-slate-200 border shadow-sm rounded-xl p-4 flex items-center justify-center"
      onClick={handleToggle}
    >
      {SWAP_ICON}
    </Link>
  );
};
