"use client";

import { useState } from "react";

export const Switch = ({ onClick }: { onClick: () => void }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
    onClick();
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        onClick={handleClick}
        value=""
        className="sr-only peer"
      />
      <div
        className={`w-11 h-6 bg-${
          active ? "slate-950" : "red-500"
        } peer-focus:outline-none rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-50`}
      ></div>
    </label>
  );
};
