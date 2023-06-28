import { FC } from "react";

type Props = {
  children: string;
};

export const Paragraph: FC<Props> = ({ children }) => (
  <p className="text-slate-600 leading-7">{children}</p>
);
