import { AuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

// Avoid unused variable warning by using underscore naming
import type { Session as _Session } from "next-auth";
import type { JWT as _JWT } from "next-auth/jwt";

interface ExtendedUser extends NextAuthUser {
  userType: string;
  id: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        await connectToDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        const isAdminEmail = user.email === "admin@example.com";
        const userType = isAdminEmail ? "Admin" : user.userType;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          userType,
        } satisfies ExtendedUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as ExtendedUser;
        token.id = u.id;
        (token as any).userType = u.userType;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).id;
        (session.user as any).userType = (token as any).userType;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
