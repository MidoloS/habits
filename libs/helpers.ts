import { Habit, Prisma, Subscriptions } from "@prisma/client";

export const SubscriptionsWithHabits: Prisma.SubscriptionsInclude = {
  habit: true,
};

export const subscribeToHabit = async (habitName: string): Promise<Habit> => {
  const response = await fetch(`/api/habit/sub/${habitName}`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
};

export const unsubscribeToHabit = async (habitName: string): Promise<Habit> => {
  const response = await fetch(`/api/habit/sub/${habitName}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const getSubscriptions = async (): Promise<Subscriptions[]> => {
  const response = await fetch("http://localhost:3000/api/habit/sub");
  const data = await response.json();
  return data;
};

export const getSubscription = async (habitName: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/habit/sub/${habitName}`
    );
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log({ error });
  }
};
