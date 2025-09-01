import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma-config";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "your email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "your password",
        },
      },
      //@ts-ignore
      async authorize(credentials: any) {
        try {
          const userExists = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!userExists || !userExists.password) {
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            userExists.password
          );

          if (!isValid) {
            return null;
          }

          return { 
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" as const},
  callbacks: {
    jwt: ({ token }: any) => {
      return token;
    },
    session: ({ session, token }: any) => {
      session.user.id = token.sub
      return session;
    },
  },
};
