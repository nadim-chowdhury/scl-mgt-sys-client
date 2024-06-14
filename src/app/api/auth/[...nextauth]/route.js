import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN_MUTATION } from "../../../../graphql/mutation";
import graphqlClient from "../../../../lib/graphqlClient";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🚀 ~ authorize ~ credentials:", credentials);

        try {
          const res = await graphqlClient.request(LOGIN_MUTATION, {
            email: credentials.email,
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
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
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
