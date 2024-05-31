import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-8">
          <h1 className="text-2xl font-bold uppercase">Scl Mgt Sys</h1>
          <nav className="flex space-x-4">
            <Link
              href="/login"
              className="hover:underline px-6 py-1 tracking-wide rounded border"
            >
              Log in
            </Link>
          </nav>
        </div>
      </div>

      <section
        id="banner"
        className="container mx-auto py-60 text-center text-white px-8 bg-blue-50"
      >
        <h2 className="text-5xl font-bold mb-4">
          Welcome to the School Management System
        </h2>
        <p className="text-xl mb-8">
          Manage your school operations effortlessly and efficiently.
        </p>
        <Link
          href="/register"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Get Started
        </Link>
      </section>

      <section id="features" className="bg-white py-20">
        <div className="container mx-auto text-center px-8">
          <h2 className="text-3xl font-bold mb-10">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-rose-50 rounded">
              <h3 className="text-2xl font-bold mb-4">Student Management</h3>
              <p>
                Track and manage student information, attendance, and
                performance.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded">
              <h3 className="text-2xl font-bold mb-4">Teacher Management</h3>
              <p>
                Manage teacher profiles, schedules, and performance reviews.
              </p>
            </div>
            <div className="p-6 bg-orange-50 rounded">
              <h3 className="text-2xl font-bold mb-4">Class Scheduling</h3>
              <p>Efficiently schedule classes, exams, and events with ease.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="container mx-auto py-20 text-center px-8">
        <h2 className="text-3xl font-bold mb-10">About Us</h2>
        <p className="text-lg">
          Our school management system is designed to streamline administrative
          tasks, improve communication, and enhance the learning experience for
          students and teachers alike.
        </p>
      </section>

      <section id="contact" className="bg-blue-50 py-36 text-white">
        <div className="container mx-auto text-center px-8">
          <h2 className="text-3xl font-bold mb-10">Contact Us</h2>
          <p className="text-lg mb-4">
            Have any questions? Get in touch with us!
          </p>
          <Link
            href="/contact"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Contact Support
          </Link>
        </div>
      </section>

      <div className="bg-blue-500 text-white py-4 text-center px-8">
        <p>&copy; 2024 School Management System. All rights reserved.</p>
      </div>
    </main>
  );
}
