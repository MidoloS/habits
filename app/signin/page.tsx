import { GoogleSignInButton } from "@/components/Button/GoogleSignIn";
import Link from "next/link";

const APP_LOGO = (
  <svg version="1.0" width="48" height="48" viewBox="0 0 499.000000 499.000000">
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

const Privacy = () => {
  return (
    <main className="bg-gradient-to-t from-zinc-900 to-zinc-950 h-screen relative">
      <div className="container mx-auto flex flex-col items-center h-full justify-around px-4">
        <header className="flex flex-col items-center">
          {APP_LOGO}
          <h1 className="text-zinc-50 text-center font-semibold text-3xl mt-10 mb-2">
            Sign In to HabitAI
          </h1>
          <p className="text-center text-zinc-400 max-w-lg">
            Start your self-improvement journey today!
          </p>
        </header>
        <GoogleSignInButton text="Sign In with Google" />
      </div>

      <footer className="bg-zinc-950 absolute w-full bottom-0 border-t border-zinc-600">
        <p className="text-zinc-400 text-center py-8">
          Made with <span>❤️</span> in Argentina •{" "}
          <Link href="/privacy" className=" underline">
            Privacy
          </Link>
        </p>
      </footer>
    </main>
  );
};

export default Privacy;
