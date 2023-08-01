import { SubscriptionWithHabit } from "@/libs/types";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      subs: SubscriptionWithHabit[];
      points: number;
    } & DefaultSession["user"];
  }
}
