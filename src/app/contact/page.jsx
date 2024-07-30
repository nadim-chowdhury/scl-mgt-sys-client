"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-16 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold ">Contact Us</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={form.message}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="Your message"
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Send Message
            </button>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 grow"
              >
                Return Dashboard
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="flex justify-center items-center gap-6">
        <Link href="https://nadim.vercel.app/">
          <span className="px-6 py-2 text-white bg-teal-500 rounded hover:bg-teal-700">
            Portfolio
          </span>
        </Link>
        <Link href="https://dev.to/nadim_ch0wdhury">
          <span className="px-6 py-2 text-white bg-slate-500 rounded hover:bg-slate-700">
            Dev.to
          </span>
        </Link>
        <Link href="https://github.com/nadim-chowdhury">
          <span className="px-6 py-2 text-white bg-amber-500 rounded hover:bg-amber-700">
            GitHub
          </span>
        </Link>
        <Link href="https://www.linkedin.com/in/nadim-chowdhury">
          <span className="px-6 py-2 text-white bg-sky-500 rounded hover:bg-sky-700">
            LinkedIn
          </span>
        </Link>
        <Link href="https://www.twitter.com/nadim_ch0wdhury">
          <span className="px-6 py-2 text-white bg-amber-500 rounded hover:bg-amber-700">
            Twitter
          </span>
        </Link>
        <Link href="https://www.instagram.com/nadim_ch0wdhury">
          <span className="px-6 py-2 text-white bg-fuchsia-500 rounded hover:bg-fuchsia-700">
            Instagram
          </span>
        </Link>
      </div>
    </div>
  );
}
