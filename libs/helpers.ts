import { Habit, Prisma, Subscriptions } from "@prisma/client";
import { SubscriptionWithHabit } from "./types";

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

export const getSubscriptions = async (): Promise<{
  data: SubscriptionWithHabit[];
  error: string;
  message: string;
}> => {
  const response = await fetch("/api/habit/sub");
  const data = await response.json();
  return data;
};

export const getSubscription = async (habitName: string) => {
  console.log(1111111111111111);

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/habit/sub/${habitName}`
  );
  console.log(22222222222222222);

  const data = await response.json();
  console.log(data);

  return data;
};
