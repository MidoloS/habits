import { FC } from "react";

type Props = {
  description: string;
  value: string | number;
};

export const Statistic: FC<Props> = ({ description, value }) => (
  <section className="flex flex-col items-center">
    <p className="font-bold text-xl text-zinc-50">{value}</p>
    <p className="text-zinc-400 text-sm">{description}</p>
  </section>
);
