"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LOGIN_USER } from "../../graphql/mutation";
import {
  notifyError,
  notifySuccess,
} from "../../components/common/Notifications";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN_USER);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { loginInput: { username, password } },
      });
      notifySuccess("Login Successful");
      localStorage.setItem("token", data.login);
      router.push("/profile");
    } catch (err) {
      console.error(err);
      notifyError("Something Went Wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg mx-4">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-8 space-y-6">
            <div className="rounded-md -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
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
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="w-4 h-4 bg-amber-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-amber-600 hover:text-amber-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md group hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Log in
                </button>

                <Link href="/register">
                  <button
                    type="button"
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md group hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Register
                  </button>
                </Link>
              </div>

              <Link href="/" className="text-white">
                <div className="flex justify-center mt-2 text-sm bg-amber-700 rounded-md py-2">
                  Return Home
                </div>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
