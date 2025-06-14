"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { REGISTER_USER } from "../../graphql/mutation";
import Link from "next/link";
import {
  notifyError,
  notifySuccess,
} from "../../components/common/Notifications";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [register] = useMutation(REGISTER_USER);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({
        variables: { createUserInput: { email, password, role } },
      });

      // If registration is successful
      if (data?.register?.id) {
        notifySuccess("Successfully Registered");
        router.push("/login"); // Redirect to login page after successful registration
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      console.error(err);
      notifyError("Something Went Wrong");
      // Stay on the same page so user can retry registration
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg mx-4">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold ">Create your account</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full px-3 py-2 border  placeholder-gray-500  rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-2 border  placeholder-gray-500  focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="relative block w-full px-3 py-2 border  placeholder-gray-500  rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm cursor-pointer"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-500 border border-transparent rounded-md group hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Register
              </button>

              <Link href="/login">
                <button
                  type="button"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-500 border border-transparent rounded-md group hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap"
                >
                  Log in
                </button>
              </Link>
            </div>

            <Link href="/" className="text-white">
              <div className="flex justify-center mt-2 text-sm bg-amber-600 rounded-md py-2">
                Return Home
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
