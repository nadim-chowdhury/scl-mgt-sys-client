import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import verifyUser from "../../../../lib/auth"; // Import your custom verification logic

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Implement your own logic to verify user credentials
        const user = await verifyUser(credentials.email, credentials.password);

        if (user) {
          // Return user object if successful
          return Promise.resolve(user);
        } else {
          // Return null if user data could not be retrieved
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    // signIn: "/auth/signin", // Custom sign-in page
    // signOut: "/auth/signout", // Custom sign-out page
    // error: "/auth/error", // Error page
    // verifyRequest: "/auth/verify-request", // Verification page
    // newUser: "/auth/new-user", // New user redirect
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
