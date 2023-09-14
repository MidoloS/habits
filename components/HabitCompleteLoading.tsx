import Image from "next/image";
import { Loading } from "./Info/Loading";

export const HabitCompleteLoading = () => (
  <article className="h-screen w-screen z-50 bg-slate-50 flex flex-col gap-8 absolute top-0 left-0 justify-center items-center">
    <div>
      <Image
        src="/forest-loading.png"
        width={300}
        height={300}
        alt="vectorial forest"
        style={{ borderRadius: 12 }}
      />
    </div>
    <div className="text-center flex flex-col gap-1">
      <h1 className="font font-heading text-slate-950 text-2xl font-semibold">
        Processing Image...
      </h1>
      <p className="text-slate-500 text-sm">This might take a few seconds</p>
    </div>
    <div>
      <Loading size="sm" />
    </div>
  </article>
);
