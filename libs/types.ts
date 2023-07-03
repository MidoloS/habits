import { Prisma } from "@prisma/client";

// Prisma.SubscriptionsScalarFieldEnum
export interface UserWithSubscriptions extends Prisma.UserGetPayload<true> {
  subscriptions: Prisma.SubscriptionsGetPayload<true>[];
}
