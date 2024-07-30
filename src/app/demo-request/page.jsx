import Link from "next/link";

export default function DemoRequest() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Request a Demo</h2>
          <p className="text-gray-600">
            Experience our school management system
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <Link href="/dashboard">
            <span className="text-amber-500 hover:underline">
              Return to Dashboard
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
