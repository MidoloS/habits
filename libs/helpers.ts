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
  const response = await fetch("/api/habit/sub");
  const data = await response.json();
  return data;
};

export const getSubscription = async (habitName: string) => {
  console.log(1111111111111111);

  const response = await fetch(`/api/habit/sub/${habitName}`);
  console.log(22222222222222222);

  const data = await response.json();
  console.log(data);

  return data;
};
