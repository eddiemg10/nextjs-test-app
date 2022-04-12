import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { signIn } from "next-auth/react";

export default NextAuth({
  providers: [
    GitHub({
      //   clientId: "c8495d250fa6a743c7e6",
      //   clientSecret: "0a82d18edfcefaf45a6b2a92105a45a919bee108",

      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  database: process.env.MONGODB_URI,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "sdse4dsxmifhedfergt",
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    // async signIn({ user }) {
    //   return user.email === "eddiemwiti10@gmail.com" ? true : false;
    // },

    async session({ session, token, user }) {
      session.user.id = token.sub;
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
});
