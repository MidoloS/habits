import { DownloadApp } from "@/components/Button/DownloadApp";
import { PrimaryButton } from "@/components/Button/Primary";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@/components/Button/GoogleSignIn";
import {
  ADD_HABIT,
  AI_VALIDATION,
  BOOST,
  COMPETITION,
  GAMIFICATION,
  POINTS,
  PSYCOLOGY,
  TAKE_SNAP,
} from "@/libs/icons";
import { ReactNode } from "react";

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

const FeatureCard = ({
  title,
  description,
  icon,
  square,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  square: boolean;
}) => {
  const classDynamic = square ? `w-[220px] h-[220px]` : `max-w-[280px]`;
  return (
    <div
      className={`flex flex-col gap-4 items-center text-center p-8 ${classDynamic} border border-zinc-700 rounded-xl justify-center`}
    >
      {icon}
      <div className="flex flex-col gap-1">
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-zinc-400 text-sm leading-6">{description}</p>
      </div>
    </div>
  );
};

const Quote = ({
  imgUrl,
  name,
  quote,
}: {
  imgUrl: string;
  name: string;
  quote: ReactNode;
}) => {
  return (
    <div className="max-w-lg flex flex-col md:flex-row items-center gap-6 md:items-start">
      <Image
        className="rounded-full max-h-[70px]"
        width={70}
        height={70}
        src={imgUrl}
        alt={name}
      />
      <div className="flex flex-col gap-2 items-center text-center md:text-left md:items-start">
        <p className="text-white">─ {name}</p>
        {quote}
      </div>
    </div>
  );
};
const Index = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }
  return (
    <>
      <main className="flex flex-col justify-center gap-8 bg-gradient-to-t from-zinc-900 to-zinc-950 min-h-[100vh] py-16">
        <div className="container mx-auto px-8 flex items-center justify-center flex-col md:flex-row gap-14">
          <div className="gap-8 flex flex-col mx-auto container">
            <h1 className="text-white mb text-center text-3xl font-semibold leading-10 md:text-6xl md:max-w-3xl md:text-left md:leading-[6rem]">
              Level Up Your Life: AI-Powered Habit Formation
            </h1>
            <p className="text-center text-zinc-400 md:max-w-xl md:text-left leading-8">
              <span className="text-white font-semibold">
                Building habits is hard. HabitAI uses AI to make it easy.{" "}
              </span>
              Set goals, snap a pic to verify completion, and earn points. Climb
              the leaderboard and crush your goals with AI by your side!
            </p>
            <div className="flex flex-col gap-4 items-center md:flex-row">
              <DownloadApp />
              <GoogleSignInButton />
            </div>
          </div>
          <Image
            alt="phone frame"
            src="/images/phone.jpeg"
            height={500}
            width={280}
            className="border border-zinc-700 rounded-2xl"
            style={{ boxShadow: "0px 0px 120px 0px rgba(0, 0, 0, 0.70)" }}
          />
        </div>
      </main>
      <section className="bg-zinc-900 border-t border-b border-zinc-700 py-16 md:py-52">
        <div className="container mx-auto flex flex-col text-center md:text-left px-8 md:flex-row justify-between items-center gap-12">
          <div className="justify-center flex flex-col gap-8 max-w-lg">
            <h1 className="text-white text-3xl font-semibold md:text-5xl">
              Unique Features
            </h1>
            <p className=" text-zinc-400 leading-7">
              Let&quot;s be real, there are a ton of habit tracker apps out
              there.
              <span className="text-white font-semibold">
                So why choose HabitAI?
              </span>
            </p>
            <p className=" text-zinc-400 leading-7">
              <span className="text-white font-semibold">
                Here&quot;s the deal: most apps leave you hanging.
              </span>
              They&quot;re all about logging and checking boxes, but they lack
              the secret sauce to make habits actually stick.
            </p>
            <p className=" text-zinc-400 leading-7">
              HabitAI is different.
              <span className="text-white font-semibold">
                {" "}
                We combine cutting-edge AI validation with powerful psychology
              </span>{" "}
              to transform goal-setting into a game you can win.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-fit gap-6">
            <FeatureCard
              title="Follow Habit"
              description="Follow any of the 8 habits there is."
              icon={ADD_HABIT}
              square
            />
            <FeatureCard
              title="Take a Snap"
              description="Follow any of the 8 habits there is."
              icon={TAKE_SNAP}
              square
            />
            <FeatureCard
              title="Earn Points"
              description="Follow any of the 8 habits there is."
              icon={POINTS}
              square
            />
            <FeatureCard
              title="Daily Boost"
              description="Follow any of the 8 habits there is."
              icon={BOOST}
              square
            />
          </div>
        </div>
      </section>
      <section className="bg-zinc-950  md:py-16">
        <div className="container mx-auto p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="29.75"
            viewBox="0 0 42 29.75"
            className="mb-14"
          >
            <g
              id="quote-right_1_"
              data-name="quote-right (1)"
              transform="translate(0 -4)"
            >
              <path
                id="Path_137"
                data-name="Path 137"
                d="M14,4H7a7,7,0,0,0-7,7v7a3.5,3.5,0,0,0,3.5,3.5H13.842A10.511,10.511,0,0,1,3.5,30.25a1.75,1.75,0,0,0,0,3.5,14.016,14.016,0,0,0,14-14V7.5A3.5,3.5,0,0,0,14,4Z"
                fill="#fff"
              />
              <path
                id="Path_138"
                data-name="Path 138"
                d="M28,4H21a7,7,0,0,0-7,7v7a3.5,3.5,0,0,0,3.5,3.5H27.842A10.511,10.511,0,0,1,17.5,30.25a1.75,1.75,0,0,0,0,3.5,14.016,14.016,0,0,0,14-14V7.5A3.5,3.5,0,0,0,28,4Z"
                transform="translate(10.5)"
                fill="#fff"
              />
            </g>
          </svg>
          <div className="flex flex-col md:flex-row gap-10">
            <Quote
              imgUrl="/jclear.png"
              name="James Clear"
              quote={
                <p className="text-zinc-400 leading-7">
                  <span className="text-white font-semibold">
                    The first mistake is never the one that ruins you.
                  </span>
                  It is the spiral of repeated mistakes that follows. Missing
                  once is an accident. Missing twice is the start of a new
                  habit.
                </p>
              }
            />
            <Quote
              imgUrl="/mtwain.png"
              name="Mark Twain"
              quote={
                <p className="text-zinc-400 leading-7">
                  The secret of getting ahead is getting started. The secret of
                  getting started is{" "}
                  <span className="text-white font-semibold">
                    breaking your complex overwhelming tasks into small
                    manageable tasks
                  </span>
                  , and starting on the first one.
                </p>
              }
            />
            <Quote
              name="Ralph Waldo Emerson"
              quote={
                <p className="text-zinc-400 leading-7">
                  The only person you are destined to become is the person you
                  decide to be.
                </p>
              }
              imgUrl="/wemerson.png"
            />
          </div>
        </div>
      </section>
      <section className="bg-zinc-900 border-t border-b border-zinc-700 py-16 md:py-32 px-8">
        <div className="container mx-auto flex flex-col text-center items-center gap-16">
          <div className="justify-center flex flex-col gap-4 max-w-lg">
            <h1 className="text-white text-3xl font-semibold md:text-5xl">
              Why HabitAI works?
            </h1>
            <p className=" text-zinc-400 leading-7">
              Sticking to new habits is tough. We get it. That&quot;s why
              HabitAI uses a powerful combo of cutting-edge science and engaging
              features to turn &quot;wish I could&quot; into &quot;watch me
              crush it.&quot;
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <FeatureCard
              title="AI Validation"
              description='No more wondering if you"re fooling anyone (especially yourself)'
              icon={AI_VALIDATION}
              square={false}
            />
            <FeatureCard
              title="Gamilification"
              description='Points, badges, leaderboards – yep, we"ve got it all. HabitAI turns habit-building into a thrilling game.'
              icon={GAMIFICATION}
              square={false}
            />
            <FeatureCard
              title="Competition"
              description=" Nothing fuels motivation like a little friendly competition. You can see your progress compared to others and push each other to the top."
              icon={COMPETITION}
              square={false}
            />
            <FeatureCard
              title="Psychological Edge"
              description="HabitAI uses proven psychological principles like habit stacking and positive reinforcement to make building habits automatic."
              icon={PSYCOLOGY}
              square={false}
            />
          </div>
        </div>
      </section>
      <footer>
        <p className="text-zinc-400 text-center py-8">
          Made with <span>❤️</span> in Argentina •{" "}
          <Link href="/privacy" className=" underline">
            Privacy
          </Link>
        </p>
      </footer>
    </>
  );
};
export default Index;
