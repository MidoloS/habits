"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PrimaryButton } from "./Button/Primary";

export const HabitCompleted = () => {
  const { push } = useRouter();
  const res = useSearchParams();

  console.log("res", res?.get("completed"));

  if (!res?.get("completed")) {
    return null;
  }

  const handleOnClick = () => {
    push("/home");
  };

  return (
    <div className="w-screen h-screen z-10 bg-black bg-opacity-80 flex items-center justify-center p-8 absolute top-0 ">
      <div className="bg-slate-50 z-20 p-6 rounded-xl gap-4 flex flex-col max-w-md">
        <h1 className="text-center text-slate-950 text-lg font-semibold font-heading">
          Habit Completed
        </h1>
        <p className="text-center text-slate-500 text-sm">
          Congratulations, you have completed the task! <br /> Dont forget that
          its the small accomplishments that make a{" "}
          <span className="text-slate-950 font-semibold">
            big change over time!
          </span>
        </p>

        <PrimaryButton onClick={handleOnClick}>Great!</PrimaryButton>
      </div>
    </div>
  );
};
