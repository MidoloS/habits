import { Habit, Subscriptions } from "@prisma/client";

// Subscription type with Habit

export type SubscriptionWithHabit = Subscriptions & {
  habit: Habit;
};
