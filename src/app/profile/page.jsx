import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const GET_PROFILE = gql`
  query GetProfile($username: String!) {
    profile(username: $username) {
      id
      username
      role
    }
  }
`;

export default function Profile() {
  const router = useRouter();
  const username = "currentUsername"; // Replace with actual username retrieval logic
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { username },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {data.profile.username}</p>
      <p>Role: {data.profile.role}</p>
    </div>
  );
}
