"use client";

import { FC, useState } from "react";
import { createPortal } from "react-dom";
import { PrimaryButton } from "./Primary";

type Props = {
  title: string;
  subtitle: string;
  show: boolean;
  children: React.ReactNode;
  buttonText: string;
};

export const Modal: FC<Props> = ({
  title,
  subtitle,
  show,
  children,
  buttonText = "Continue",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(show);

  const handleModal = () => {
    setIsVisible((prev) => !prev);
  };

  if (!isVisible) return null;

  return createPortal(
    <div className="absolute top-0 left-0 bg-slate-950 bg-opacity-80 w-screen h-screen z-50 p-8 flex justify-center items-center">
      <div className="bg-slate-50 p-6 rounded-xl relative flex flex-col gap-4 max-w-md">
        <div>
          {subtitle && (
            <p className="text-center text-slate-500 text-sm mb-2">
              {subtitle}
            </p>
          )}
          <h1 className="font-heading text-lg font-semibold text-center">
            {title}
          </h1>
        </div>
        {children}
        <PrimaryButton onClick={handleModal}>{buttonText}</PrimaryButton>
      </div>
    </div>,
    document.body
  );
};
