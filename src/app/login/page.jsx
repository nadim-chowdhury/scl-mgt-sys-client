"use client";

import {
  notifyError,
  notifySuccess,
} from "../../components/common/Notifications";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (formData) => {
    console.log("🚀 ~ onSubmit ~ formData:", formData);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      console.log("🚀 ~ onSubmit ~ res:", res);

      if (res.ok) {
        notifySuccess("Logged in successfully!");
        // router.push("/dashboard");
      } else {
        notifyError("Login failed. Please try again.");
      }
    } catch (error) {
      notifyError("Login failed. Please try again.");
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  autoComplete="email"
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-amber-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  autoComplete="current-password"
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-amber-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
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
                  className="font-medium text-amber-600 hover:text-amber-700"
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

        {/* {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>Login successful: {data.login}</p>} */}
      </div>
    </div>
  );
}

// import { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { useRouter } from 'next/router';

// const LOGIN_USER = gql`
//   mutation Login($username: String!, $password: String!) {
//     login(username: $username, password: $password)
//   }
// `;

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [login] = useMutation(LOGIN_USER);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await login({ variables: { username, password } });
//       localStorage.setItem('token', data.login);
//       router.push('/profile');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   );
// }
