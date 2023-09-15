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
    className="bg-slate-50 shadow-sm border border-slate-200 text-slate-950 p-3 rounded-lg flex items-center justify-center font-medium text-sm"
    disabled={disabled || isLoading}
    onClick={onClick}
  >
    <div>{isLoading && <Loading size={5} />}</div>
    {isLoading ? "Loading..." : children}
  </button>
);
