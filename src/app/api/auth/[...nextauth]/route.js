import { LOGIN_USER } from "@/graphql/mutation";
import graphqlClient from "@/lib/graphqlClient";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🚀 ~ authorize ~ credentials:", credentials);

        try {
          const res = await graphqlClient.request(LOGIN_USER, {
            username: credentials.username,
            password: credentials.password,
          });
          console.log("🚀 ~ authorize ~ login:", res);

          const user = res.login;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
  },
  pages: {
    signIn: "/dashboard",
    signOut: "/",
  },
  session: {
    jwt: true,
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
