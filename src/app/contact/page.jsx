"use client";

import Link from "next/link";

export default function page() {
  const handleSubmit = () => {};

  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Contact Us
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Your message"
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Message
            </button>

            <div className="flex justify-center mt-2 text-sm bg-blue-100 rounded-md py-2">
              <Link href="/" className="text-blue-500">
                Return Home
              </Link>
            </div>
          </div>
        </form>
      </div>

      <div className="flex justify-center items-center gap-6 pb-12">
        <Link
          className="bg-teal-500 hover:bg-teal-700 text-white rounded px-6 py-2"
          href="https://nadim.vercel.app/"
        >
          Portfolio
        </Link>
        <Link
          className="bg-slate-500 hover:bg-slate-700 text-white rounded px-6 py-2"
          href="https://dev.to/nadim_ch0wdhury"
        >
          Dev.to
        </Link>
        <Link
          className="bg-indigo-500 hover:bg-indigo-700 text-white rounded px-6 py-2"
          href="https://github.com/nadim-chowdhury"
        >
          GitHub
        </Link>
        <Link
          className="bg-sky-500 hover:bg-sky-700 text-white rounded px-6 py-2"
          href="https://www.linkedin.com/in/nadim-chowdhury"
        >
          LinkedIn
        </Link>
        <Link
          className="bg-amber-500 hover:bg-amber-700 text-white rounded px-6 py-2"
          href="https://www.twitter.com/nadim_ch0wdhury"
        >
          Twitter
        </Link>
        <Link
          className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white rounded px-6 py-2"
          href="https://www.instagram.com/nadim_ch0wdhury"
        >
          Instagram
        </Link>
      </div>
    </div>
  );
}
