"use client";

import { notifyError, notifySuccess } from "@/components/common/Notifications";
import { REGISTER_MUTATION } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [registerMutation, { data, loading, error }] =
    useMutation(REGISTER_MUTATION);

  const router = useRouter();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (formData) => {
    try {
      await registerMutation({ variables: formData });
      notifySuccess("Registered successfully!");
      router.push("/login");
    } catch (error) {
      console.error("onSubmit ~ error:", error);
      notifyError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md  -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

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
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                id="role"
                name="role"
                {...register("role", { required: "Role is required" })}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-amber-500 focus:z-10 sm:text-sm cursor-pointer"
              >
                <option value="">Select role</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </select>
              {errors.role && (
                <span className="text-red-500 text-sm">
                  {errors.role.message}
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
                {...register("password", { required: "Password is required" })}
                autoComplete="current-password"
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password.current || "Passwords do not match",
                })}
                autoComplete="current-password"
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md group hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Register
              </button>

              <Link href="/login">
                <button
                  type="button"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md group hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 text-nowrap"
                >
                  Log in
                </button>
              </Link>
            </div>

            <Link href="/" className="text-white">
              <div className="flex justify-center mt-2 text-sm bg-amber-700 rounded-md py-2">
                Return Home
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
