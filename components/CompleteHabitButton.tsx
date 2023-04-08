"use client";

const handleCompleteHabit = async ({ habitName }: { habitName: string }) => {
  fetch("/api/complete", {
    body: JSON.stringify({ habitName }),
    method: "POST",
  });
};

const CompleteHabitButton = ({ habitName }: { habitName: string }) => (
  <button
    className="bg-black text-white py-3 px-5 rounded-lg"
    onClick={() => handleCompleteHabit({ habitName })}
  >
    Complete habit
  </button>
);
export default CompleteHabitButton;
