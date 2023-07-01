import { FC } from "react";

type Props = {
  children: React.ReactNode;
  text: string;
};

export const Feature: FC<Props> = ({ children, text }) => (
  <div className="flex flex-col items-center">
    <div className="bg-slate-100 w-fit p-4 rounded-md">{children}</div>
    <div>
      <p className="text-slate-500 text-sm">{text}</p>
    </div>
  </div>
);
