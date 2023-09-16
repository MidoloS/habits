import Image from "next/image";

import { GoogleSignInButton } from "@/components/Button/GoogleSignIn";

const SignInPage = () => {
  return (
    <main className="p-7 flex flex-col h-screen">
      <div className="flex items-center gap-2 mb-4 ">
        <Image
          src="/icon-192x192.png"
          alt="wonderful big tree vectorial design"
          height={50}
          width={50}
        />
        <p className="font-heading font-semibold text-slate-950">HabitAI</p>
      </div>

      <div className="flex flex-col justify-between items-center grow gap-6  md:flex-row md:gap-10 md:justify-center">
        <div className="flex  items-end justify-end h-[60%] md:h-fit">
          <Image
            src="/signin.png"
            alt="wonderful big tree vectorial design"
            height={300}
            width={300}
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col grow justify-between md:gap-6 md:max-w-sm">
          <div className="flex flex-col gap-2">
            <h1 className="text-center font-heading font-semibold text-2xl text-slate-950 md:text-left">
              Begin Journey
            </h1>
            <p className="text-slate-600 text-center text-sm md:text-left">
              Create habits with AI and compete with other Rankers around the
              world.
            </p>
          </div>
          <div>
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
