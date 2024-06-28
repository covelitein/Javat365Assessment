import  { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "../server";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "../types";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as User;

        // check if fields contains values
        if (!email || !password)
          throw new Error("email or password field empty");

        // check if user record exist in database
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) throw new Error("Invalid credentials");

        const passwordCorrect = await compare(
          password,
          user.password as string
        );

        if (!passwordCorrect) throw new Error("Invalid credentials");

        return {
          id: `${user.id}`,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV == "development",
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;