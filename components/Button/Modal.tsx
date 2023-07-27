"use client";

import { FC, useState } from "react";
import { createPortal } from "react-dom";
import { PrimaryButton } from "./Primary";

type Props = {
  buttonText: string;
  title: string;
  description: string;
};

export const Modal: FC<Props> = ({ buttonText, title, description }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleModal = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={handleModal}
        className="bg-slate-50 shadow-sm border border-slate-200 text-slate-950 p-3 rounded-lg flex items-center justify-center font-medium text-sm"
      >
        {buttonText}
      </button>
      {isVisible &&
        createPortal(
          <div className="absolute top-0 left-0 bg-slate-950 bg-opacity-80 w-screen h-screen z-50 p-8 flex justify-center items-center">
            <div className="bg-slate-50 p-6 rounded-xl relative flex flex-col gap-4 max-w-md">
              <h1 className="font-heading text-lg font-semibold text-center">
                {title}
              </h1>
              <p className="text-slate-500 text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut
                fuga illum sapiente itaque qui. Quas assumenda odio voluptates
                quidem quod itaque nesciunt, vero exercitationem sed porro,
                cupiditate a laudantium nemo.
              </p>
              <PrimaryButton onClick={handleModal}>Close</PrimaryButton>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
