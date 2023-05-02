import { FC } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const SecondaryButton: FC<Props> = ({ children, ...other }) => (
  <button
    className="border-2 border-slate-950 w-full text-slate-950 rounded-xl py-4 font-medium"
    {...other}
  >
    {children}
  </button>
);
