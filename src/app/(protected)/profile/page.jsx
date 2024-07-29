"use client";

import { GET_PROFILE } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [username, setUsername] = useState("sydykeqij");

  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { username },
  });
  console.log("🚀 ~ Profile ~ data:", data);

  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     router.push("/login");
  //   }
  // }, [router]);

  // if (loading) return <p className="text-center mt-4">Loading...</p>;
  // if (error)
  //   return (
  //     <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
  //   );

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg mx-4">
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Profile
          </h1>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="py-2 flex items-center gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <p className="text-amber-900 font-bold">
                {data?.profile?.username}
              </p>
            </div>

            <div className="py-2 flex items-center gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Role:
              </label>
              <p className="text-amber-900 font-bold">{data?.profile?.role}</p>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => router.push("/")}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md group hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
