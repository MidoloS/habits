import { DownloadApp } from "@/components/Button/DownloadApp";
import { PrimaryButton } from "@/components/Button/Primary";
import Image from "next/image";
import Link from "next/link";

const Index = async () => {
  return (
    <div className="landing-back">
      <header className="absolute px-32 top-0 left-0 p-4 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={50} height={50} alt="habitai logo" />
          </div>
          <div>
            <Link href="/signin">
              <PrimaryButton>Sign In</PrimaryButton>
            </Link>
          </div>
        </div>
      </header>
      <div className="p-7 container mx-auto  justify-evenly h-screen flex relative">
        <div className="flex flex-col justify-center items-center gap-8 max-w-lg ">
          <h1 className="md:text-4xl text-2xl font-bold text-center">
            Enchase your habits with AI
          </h1>
          <p className="text-center">
            HabitAI is a cutting-edge app that supercharges your journey to
            healthier habits through friendly competition.
            <b className="block">Take pictures, gain XP, create habits!</b>
          </p>
          <div className="flex">
            <DownloadApp />
          </div>
          <div className="flex justify-evenly w-full items-center text-center gap-4 flex-col xs:flex-row">
            <div>
              <h2 className="subheading-1">HABITS</h2>
              <p className="font-bold text-2xl">15</p>
            </div>
            <div>
              <h2 className="subheading-1">USERS</h2>
              <p className="font-bold text-2xl">+100.000</p>
            </div>

            <div>
              <h2 className="subheading-1">HABITS CREATED</h2>
              <p className="font-bold text-2xl">+500.000</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            className="hidden md:block "
            src="/home-portrait.png"
            width={300}
            height={600}
            alt="mobile portrait"
          />
        </div>
        <Link href="/privacy" className="absolute bottom-0">
          Privacy
        </Link>
      </div>
    </div>
  );
};
export default Index;
