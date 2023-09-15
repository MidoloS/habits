import { FC } from "react";
import { Loading } from "../Info/Loading";

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
    disabled={disabled}
    onClick={onClick}
  >
    <div>{isLoading && <Loading size={9} />}</div>
    {!isLoading && children}
  </button>
);
