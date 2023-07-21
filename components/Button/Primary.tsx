import { FC } from "react";
import { Loading } from "../Loading";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export const PrimaryButton: FC<Props> = ({
  children,
  disabled,
  onClick,
  isLoading,
}) => (
  <button
    className="flex justify-center bg-slate-950 font-sans w-full text-white rounded-xl text-sm font-medium py-4 px-6 md:w-fit disabled:bg-slate-200 disabled:text-slate-400"
    disabled={disabled || isLoading}
    onClick={onClick}
  >
    <div>{isLoading && <Loading />}</div>
    {isLoading ? "Loading..." : children}
  </button>
);
