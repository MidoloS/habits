import { Loading } from "./Loading";

export const HabitCompleteLoading = () => (
  <article className="h-screen w-screen z-50 bg-slate-50 flex flex-col gap-8 absolute top-0 left-0 justify-center items-center">
    <div>
      <Loading />
    </div>
    <div className="text-center flex flex-col gap-1">
      <h1 className="font font-heading text-slate-950 text-2xl font-semibold">
        Processing...
      </h1>
      <p className="text-slate-500">This might take a few seconds</p>
    </div>
  </article>
);
