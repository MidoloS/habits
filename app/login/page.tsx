import { HabitCard } from "@/components/HabitCard";
import { Completed } from "@/components/Completed";
import Link from "next/link";
import { getUserHabits } from "@/prisma/helpers";
import { TITLES } from "@/libs/constants";
import { useRouter } from "next/router";

export default async function Home() {
  return (
    <>
      <h1 className="font-bold text-5xl mb-6">Log In</h1>
      <form action="">
        <input type="text" />
        <input type="text" />
        <button>Log In</button>
      </form>
    </>
  );
}
