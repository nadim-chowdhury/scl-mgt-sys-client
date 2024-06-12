import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default async function auth(req, res) {
  let providers = [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials, req) {
        const query = `
          query userLogin($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              id
              name
              email
            }
          }
        `;

        const variables = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch("http://127.0.0.1:8000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, variables }),
        });

        const json = await res.json();

        if (res.ok && json.data && json.data.user) {
          return json.data.user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin");

  if (isDefaultSigninPage) {
    providers = providers.filter((provider) => provider.name !== "Google");
  }

  return await NextAuth(req, res, {
    providers,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    },
    pages: {
    //   signIn: "/login",
      //   signOut: "/register",
      //   error: "/auth/error",
      //   verifyRequest: "/auth/verify-request",
      //   newUser: null,
    },
    callbacks: {
      async jwt(token, user) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session(session, token) {
        session.user.id = token.id;
        return session;
      },
    },
  });
}
