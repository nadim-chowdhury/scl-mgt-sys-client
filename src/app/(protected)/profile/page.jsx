"use client";

import { GET_PROFILE } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [username, setUsername] = useState("");

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
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold ">Profile</h1>
        </div>

        <div className="mt-8 space-y-6">
          <div className="py-3 px-6 flex items-center gap-4 bg-amber-50 rounded-md border">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <p className="text-amber-900 font-bold">{data?.profile?.email}</p>
          </div>

          <div className="py-3 px-6 flex items-center gap-4 bg-amber-50 rounded-md border">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <p className="text-amber-900 font-bold">{data?.profile?.email}</p>
          </div>

          <div className="py-3 px-6 flex items-center gap-4 bg-amber-50 rounded-md border">
            <label className="block text-sm font-medium text-gray-700">
              Role:
            </label>
            <p className="text-amber-900 font-bold">{data?.profile?.role}</p>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 grow"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
