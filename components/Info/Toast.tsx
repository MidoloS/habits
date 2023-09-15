"use client";

import { FC, useState, useEffect } from "react";

type Props = {
  text: string;
  duration?: number;
};

export const Toast: FC<Props> = ({ text, duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="animate-fade-down bg-slate-50 absolute top-0 m-2">
      <p className="font-medium text-sm">{text}</p>
    </div>
  );
};
