import { FC } from "react";
import { Loading } from "../Info/Loading";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
  icon?: React.ReactNode;
};

export const PrimaryButton: FC<Props> = ({
  children,
  disabled,
  onClick,
  isLoading,
  isActive = false,
  icon,
}) => {
  const style = isActive
    ? "bg-slate-950 text-slate-50"
    : "border-slate-900 text-slate-900 border-2";
  return (
    <button
      className={`${style} font-medium font-sans text-sm rounded-xl px-5 py-3 duration-500 inline-flex items-center h-fit disabled:text-slate-400`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading && <Loading size={5} />}
      {isActive && !isLoading && icon}
      {children}
    </button>
  );
};
