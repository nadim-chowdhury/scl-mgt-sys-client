import Link from "next/link";
import Navbar from "../common/Navbar";

export default function HeroSection() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      <div className="bg-black bg-opacity-50">
        <Navbar />

        <div className="flex flex-col items-center justify-center min-h-[80vh] md:min-h-screen text-white container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Manage Your School Effortlessly
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center">
            Simplify administrative tasks, enhance learning, and improve
            communication with our all-in-one school management system.
          </p>
          <div className="space-x-4">
            <Link
              href="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded border border-indigo-600"
            >
              Sign Up
            </Link>
            <Link
              href="/demo-request"
              className="bg-transparent border border-white hover:bg-white hover:text-black text-white py-2 px-4 rounded"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
