"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SHARE_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      id="share"
      d="M19.311,14.666a4.653,4.653,0,0,0-3.835,2.024l-6.5-2.939a4.578,4.578,0,0,0,0-3.488l6.493-2.954a4.661,4.661,0,1,0-.826-2.643,4.638,4.638,0,0,0,.08.786l-6.9,3.14a4.665,4.665,0,1,0-.015,6.827l6.92,3.128a4.741,4.741,0,0,0-.079.785,4.662,4.662,0,1,0,4.661-4.666ZM19.311,2a2.667,2.667,0,1,1-2.663,2.666A2.665,2.665,0,0,1,19.311,2ZM4.662,14.666A2.667,2.667,0,1,1,7.325,12,2.665,2.665,0,0,1,4.662,14.666ZM19.311,22a2.667,2.667,0,1,1,2.664-2.667A2.665,2.665,0,0,1,19.311,22Z"
      transform="translate(0.027 0.001)"
      fill="#020617"
    />
  </svg>
);

export const ShareButton = () => {
  const pathname = usePathname();
  const [isNativeShareSupported, setShare] = useState<boolean>(false);
  console.log(pathname);

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
  return <button onClick={handleShare}>{SHARE_ICON}</button>;
};
