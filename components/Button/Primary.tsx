import { FC } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const PrimaryButton: FC<Props> = ({ children }) => (
  <button className="bg-slate-950 w-full text-white rounded-xl py-4 font-medium my-4">
    {children}
  </button>
);
