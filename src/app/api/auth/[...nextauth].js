import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/graphql",
            {
              query: `
              mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  user {
                    id
                    name
                    email
                  }
                  accessToken
                }
              }
            `,
              variables: {
                email: credentials.email,
                password: credentials.password,
              },
            }
          );

          const { data } = response;
          const user = data.data.login;

          if (user && user.accessToken) {
            return user;
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
