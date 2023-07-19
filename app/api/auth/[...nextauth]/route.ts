import { createUser } from "@/prisma/helpers";
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
    async signIn({ profile }) {
      console.log("LA WEA MAXIMA VOLADORA DE SIGN IN");

      console.log({ profile });

      try {
        const res = await createUser({
          email: profile?.email,
          name: profile?.name,
          // @ts-ignore
          img: profile?.picture || profile?.image,
        });
        console.log({ res });

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
