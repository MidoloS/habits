import { PrimaryButton } from "@/components/Button/Primary";
import { Camera } from "@/components/Camera";
import CompleteHabitButton from "@/components/CompleteHabitButton";
import GoBackButton from "@/components/GoBackButton";
import { getHabit } from "@/prisma/helpers";
import { HabitName } from "@prisma/client";

export default async function Page({
  params: { name },
}: {
  params: { name: HabitName };
}) {
  // const habit = await getHabit(name);

  // console.log(habit);

  // if (!habit?.createdAt) {
  //   return <h1>Habit not found</h1>;
  // }

  return (
    <>
      <div className="max-h-48">
        <Camera />
      </div>
    </>
  );
}
