import Image from "next/image";

import { GoogleSignInButton } from "@/components/Button/GoogleSignIn";

const SignInPage = () => {
  return (
    <figure className="relative w-full h-screen bg-[#0F1A22] flex flex-col items-center">
      <Image
        src="/signin.png"
        alt="wonderful big tree vectorial design"
        height={669}
        width={430}
      />

      <div className="absolute bottom-0 flex w-full p-8 flex-col gap-10 justify-center items-center">
        <div>
          <h1 className="text-center text-slate-50 font-heading font-semibold text-3xl">
            Begin Journey
          </h1>
          <p className="text-slate-400 text-center text-sm">
            Join to other Rankers around the world
          </p>
        </div>
        <GoogleSignInButton />
      </div>
    </figure>
  );
};

export default SignInPage;
