import { FC } from "react";

type Props = {
  children: React.ReactNode;
  text: string;
};

export const Feature: FC<Props> = ({ children, text }) => (
  <div className="flex flex-col items-center">
    <div className="border w-fit p-4 rounded-xl">{children}</div>
    <div className="mt-2">
      <p className="text-slate-500 text-xs font-sans">{text}</p>
    </div>
  </div>
);
