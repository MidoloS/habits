import { FC } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const PrimaryButton: FC<Props> = ({ children, disabled, onClick }) => (
  <button
    className="bg-slate-950 font-sans w-full text-white rounded-xl text-sm font-medium py-4 px-6 md:w-fit disabled:bg-slate-200 disabled:text-slate-400"
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
