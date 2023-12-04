"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SHARE_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <path
      id="share"
      d="M16.088,12.222a3.878,3.878,0,0,0-3.2,1.687L7.474,11.459a3.815,3.815,0,0,0,0-2.906l5.41-2.461a3.884,3.884,0,1,0-.688-2.2,3.865,3.865,0,0,0,.067.655L6.516,7.16A3.888,3.888,0,1,0,6.5,12.849l5.767,2.606a3.951,3.951,0,0,0-.066.654,3.885,3.885,0,1,0,3.884-3.888Zm0-10.555a2.222,2.222,0,1,1-2.219,2.222,2.221,2.221,0,0,1,2.219-2.222ZM3.88,12.222A2.222,2.222,0,1,1,6.1,10,2.221,2.221,0,0,1,3.88,12.222Zm12.208,6.11a2.222,2.222,0,1,1,2.22-2.222,2.221,2.221,0,0,1-2.22,2.222Z"
      transform="translate(0.027 0.001)"
      fill="#020617"
    />
  </svg>
);

export const ShareButton = () => {
  const pathname = usePathname();
  const [isNativeShareSupported, setShare] = useState<boolean>(false);

  useEffect(() => {
    if (navigator) {
      setShare(true);
    }
  }, []);

  const handleShare = () => {
    if (isNativeShareSupported) {
      navigator.share({
        url: "",
        title: "Habit",
      });
    }
  };
  return (
    <button
      onClick={handleShare}
      className="bg-slate-50  border  border-slate-200 text-slate-950 p-4 rounded-lg flex items-center justify-center"
      aria-label="Share"
    >
      {SHARE_ICON}
    </button>
  );
};
