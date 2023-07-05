import { Subscriptions, User } from "@prisma/client";
import { UserWithSubscriptions } from "./types";

export const subscribeToHabit = async ({
  habitName,
}: {
  habitName: string;
}) => {
  const response = await fetch(`/api/habit/subscribe/${habitName}`, {
    method: "POST",
  });
  const data = await response.json();
  alert(JSON.stringify(data));
  return data;
};

export const unsubscribeToHabit = async ({
  habitName,
}: {
  habitName: string;
}) => {
  const response = await fetch(`/api/habit/unsubscribe/${habitName}`, {
    method: "DELETE",
  });
  const data = await response.json();
  alert(JSON.stringify(data));
  return data;
};

export const isFollowing = ({
  subscriptions,
  habitName,
}: {
  subscriptions: Subscriptions[];
  habitName: string;
}) => subscriptions.some((sub: Subscriptions) => sub.habitName === habitName);

export const getSubscriptions = async () => {
  console.log(1);

  const response = await fetch("http://localhost:3000/api/subscriptions");
  console.log({ response });
  const data = await response.json();
  console.log({ data });
  console.log("----------------------");

  return data;
};
