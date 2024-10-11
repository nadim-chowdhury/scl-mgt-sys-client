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
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN_USER);
  const dispatch = useDispatch();
  const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await login({
  //       variables: { loginInput: { email, password } },
  //     });

  //     // Since login returns a string (the token), assign it directly
  //     const token = data?.login;
  //     if (token) {
  //       notifySuccess("Login Successful");
  //       localStorage.setItem("token", token);
  //       router.push("/profile");
  //     } else {
  //       throw new Error("No token received");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     notifyError("Something Went Wrong");
  //     // Remove redirect to dashboard if login fails, stay on login page
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { loginInput: { email, password } },
      });

      // Extract token and user info from response
      // const { accessToken, user } = data?.login;

      notifySuccess("Login Successful");
      // localStorage.setItem("token", accessToken);
      // Optionally, store user info in localStorage or context
      // localStorage.setItem("user", JSON.stringify(user));
      dispatch(
        loginSuccess({
          accessToken: data.login.accessToken,
          userInfo: data.login.user,
        })
      );
      router.push("/profile");
    } catch (err) {
      console.error(err);
      notifyError("Something Went Wrong");
      // Stay on login page to retry
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg mx-4">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold ">
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-8 space-y-6">
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
                  className="relative block w-full px-3 py-2 border  placeholder-gray-500  rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
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
                  className="w-4 h-4 bg-amber-600  rounded"
                />
                <label htmlFor="remember_me" className="block ml-2 text-sm ">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-amber-500 hover:text-amber-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-500 border border-transparent rounded-md group hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Log in
                </button>

                <Link href="/register">
                  <button
                    type="button"
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-500 border border-transparent rounded-md group hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Register
                  </button>
                </Link>
              </div>

              <Link href="/" className="text-white">
                <div className="flex justify-center mt-2 text-sm bg-amber-600 rounded-md py-2">
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
