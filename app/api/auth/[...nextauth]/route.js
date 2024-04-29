import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectDB } from "@utils/database";

import User from "@models/user";

const handlers = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectDB();
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handlers as GET, handlers as POST };
