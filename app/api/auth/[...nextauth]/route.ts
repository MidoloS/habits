import { getUser, getUserHabits } from "@/prisma/helpers";
import { createUser, getSubscriptions } from "@/prisma/helpers";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: "secret",
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId:
        "104807834649-9f3pfm5ds0ajtndsqc1pqvhhm34civpt.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
    // @ts-ignore
    session: async ({ session, token }) => {
      if (!session || !token) {
        return null;
      }

      if (!session?.user?.email) {
        return null;
      }

      const dbUser = await getUser(session.user?.email);

      if (!dbUser) {
        Promise.reject(null);
        return null;
      }

      session.user.subs = dbUser.subscriptions || [];

      session.user.points = dbUser.points || 0;

      session.user.id = dbUser.id;

      return Promise.resolve(session);
    },

    async signIn({ profile }) {
      try {
        const res = await createUser({
          email: profile?.email,
          name: profile?.name,
          // @ts-ignore
          img: profile?.image || profile?.picture || "/default_user.png",
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
