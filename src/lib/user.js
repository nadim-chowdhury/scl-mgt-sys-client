import { GraphQLClient } from "graphql-request";
import { LOGIN_MUTATION } from "../graphql/mutation";

const client = new GraphQLClient("http://127.0.0.1:8000/graphql");

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
