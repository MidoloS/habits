import Link from "next/link";
import { HabitCard } from "./HabitCard";

export const EmptyHabit = () => (
  <HabitCard
    title="Nothing here"
    subtitle="Begin your journey"
    habitName=""
    src="/empty.png"
    suffix={
      <div className="py-2">
        <Link
          href="/habit/new"
          className="bg-slate-50 rounded-xl text-sm font-medium p-4 "
        >
          Start new habit
        </Link>
      </div>
    }
  />
);
