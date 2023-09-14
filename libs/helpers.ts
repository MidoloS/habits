import { Habit, Prisma, User } from "@prisma/client";
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

export const getSubscription = async (
  habitName: string
): Promise<{
  data: SubscriptionWithHabit;
  error: string;
  message: string;
}> => {
  console.log(1111111111111111);

  const response = await fetch(`/api/habit/sub/${habitName}`);
  console.log(22222222222222222);

  const data = await response.json();
  console.log(data);

  return data;
};

export const completeHabit = async (habitName: string) => {
  const response = await fetch(`/api/habit/complete/${habitName}`, {
    method: "POST",
  });

  const data = await response.json();

  return data;
};

export const getUsers = async (): Promise<{
  data: User[];
  error: string | null;
  message: string;
}> => {
  console.log("pepe1");

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);

  console.log("pepe2");

  const data = await response.json();

  return data;
};

export const createDateWithTimezone = (
  date: Date = new Date(),
  timeZone: string
) => {
  if (typeof date === "string") {
    return new Date(
      new Date(date).toLocaleString("en-US", {
        timeZone,
      })
    );
  }

  return new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );
};

export const currentDateWithTimezone = (timeZone: string) => {
  return createDateWithTimezone(new Date(), timeZone);
};

export const getKeyWithMaxValue = (obj: Object) => {
  const maxVal = Math.max(...Object.values(obj));

  for (const [key, value] of Object.entries(obj)) {
    if (value === maxVal) {
      return key;
    }
  }

  return Object.entries(obj)[0][0];
};

export const formatName = (name: string) => {
  if (!name) return "Anonymous";

  const [first, last = ""] = name.split(" ");

  if (!last) return first;

  return `${first}. ${last[0]}`;
};
