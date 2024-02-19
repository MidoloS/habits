import { DownloadApp } from "@/components/Button/DownloadApp";
import { PrimaryButton } from "@/components/Button/Primary";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@/components/Button/GoogleSignIn";

const APP_LOGO = (
  <svg version="1.0" width="52" height="52" viewBox="0 0 499.000000 499.000000">
    <g
      transform="translate(0.000000,499.000000) scale(0.100000,-0.100000)"
      fill="#fff"
      stroke="none"
    >
      <path
        d="M760 2500 l0 -1820 1055 0 1055 0 0 745 0 745 -363 0 -364 0 -6 -367
c-4 -201 -8 -368 -10 -369 -1 -1 -137 -4 -302 -5 l-300 -3 -3 1447 -2 1447
-380 0 -380 0 0 -1820z"
      />
      <path
        d="M2140 3575 l0 -745 363 0 364 0 6 366 c3 201 7 367 9 369 1 2 138 5
303 6 l300 3 3 -1447 2 -1447 375 0 375 0 0 1820 0 1820 -1050 0 -1050 0 0
-745z"
      />
    </g>
  </svg>
);

const Index = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }
  return (
    <div className="container mx-auto">
      <header className="flex items-center justify-between py-6">
        {APP_LOGO}
        <GoogleSignInButton />
      </header>
      <main className="flex flex-col">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold md:text-4xl text-center text-zinc-50">
            Enchase your habits with AI
          </h1>
          <p className="text-center text-zinc-400">
            HabitAI is a cutting-edge app that supercharges your journey to
            healthier habits through friendly competition.
            <b className="block text-zinc-50">
              Take pictures, gain XP, create habits!
            </b>
          </p>
          <DownloadApp />
        </div>
      </main>
      <Link href="/privacy" className="absolute bottom-0">
        Privacy
      </Link>
    </div>
  );
};
export default Index;
