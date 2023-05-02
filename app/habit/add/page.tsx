import { PrimaryButton } from "@/components/Button/Primary";
import { SecondaryButton } from "@/components/Button/Secondary";
import { Camera } from "@/components/Camera";
import CompleteHabitButton from "@/components/CompleteHabitButton";
import GoBackButton from "@/components/GoBackButton";
import { TITLES } from "@/libs/constants";
import { getHabit } from "@/prisma/helpers";
import { HabitName } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <h1>Add habit</h1>
    </>
  );
}
