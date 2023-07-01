import { FC } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const PrimaryButton: FC<Props> = ({ children }) => (
  <button className="bg-slate-950 w-full text-white rounded-xl text-sm font-medium py-4 px-6 md:w-fit">
    {children}
  </button>
);
