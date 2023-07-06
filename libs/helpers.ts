import { Habit, Prisma, Subscriptions } from "@prisma/client";

export const SubscriptionsWithHabits: Prisma.SubscriptionsInclude = {
  habit: true,
};

export const subscribeToHabit = async (habitName: string): Promise<Habit> => {
  const response = await fetch(`/api/habit/subscribe/${habitName}`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
};

export const unsubscribeToHabit = async (habitName: string): Promise<Habit> => {
  const response = await fetch(`/api/habit/unsubscribe/${habitName}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const getSubscriptions = async (): Promise<Subscriptions[]> => {
  const response = await fetch("http://localhost:3000/api/subscriptions");
  const data = await response.json();
  return data;
};

export const getSubscription = async (
  habitName: string
): Promise<Subscriptions> => {
  const response = await fetch(
    `http://localhost:3000/api/subscription/${habitName}`
  );
  const data = await response.json();
  return data;
};
