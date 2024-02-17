import { FC } from "react";
import { Loading } from "../Info/Loading";

type Props = {
  children: React.ReactNode;
  onClick?: (event: any) => void;
  disabled?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export const PrimaryButton: FC<Props> = ({
  children,
  disabled,
  onClick,
  isLoading,
  isActive = true,
  icon,
  size = "sm",
  fullWidth = true,
}) => {
  const DICT = {
    sm: "py-2",
    md: "py-3",
    lg: "py-4",
  };

  const style = isActive
    ? "bg-zinc-50 text-zinc-950"
    : "border-zinc-50 text-zinc-50 border-2";
  return (
    <button
      className={`${style} ${
        DICT[size]
      } font-medium font-sans text-center rounded-xl px-5 py-3 duration-500 justify-center inline-flex items-center disabled:text-zinc-500 disabled:bg-zinc-300 disabled:cursor-not-allowed ${
        fullWidth ? "w-full" : "w-fit"
      }`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading && <Loading size={5} />}
      {isActive && !isLoading && icon}
      {children}
    </button>
  );
};
