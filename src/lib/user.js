import { GraphQLClient } from "graphql-request";
import { LOGIN_MUTATION } from "../graphql/mutation";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_SERVER_URL);

export async function getUserByEmailAndPassword(email, password) {
  try {
    const data = await client.request(LOGIN_MUTATION, {
      email,
      password,
    });
    return data.user;
  } catch (error) {
    console.error("Error fetching user by email and password:", error);
    return null;
  }
}
