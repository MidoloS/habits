import { FC } from "react";
import { Loading } from "../Info/Loading";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export const PrimaryButton: FC<Props> = ({
  children,
  disabled,
  onClick,
  isLoading,
  isActive = true,
  icon,
  size = "sm",
}) => {
  const DICT = {
    sm: "py-2",
    md: "py-3",
    lg: "py-4",
  };

  const style = isActive
    ? "bg-slate-950 text-slate-50"
    : "border-slate-900 text-slate-900 border-2";
  return (
    <button
      className={`${style} ${DICT[size]} font-medium font-sans text-center text-sm rounded-xl px-5 py-3 duration-500 justify-center inline-flex items-center disabled:text-slate-400`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading && <Loading size={5} />}
      {isActive && !isLoading && icon}
      {children}
    </button>
  );
};
