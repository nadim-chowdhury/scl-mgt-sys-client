import { getUserByEmailAndPassword } from "./user"; // Adjust this import to your user data fetching logic

export async function verifyUser(email, password) {
  const user = await getUserByEmailAndPassword(email, password); // Your custom user fetching logic
  if (user && user.password === password) {
    return {
      id: user.id,
      email: user.email,
      name: user.name, // Include any other user fields you need
    };
  }
  return null;
}
