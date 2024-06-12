import Navbar from "../common/Navbar";

export default function HeroSection() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-[80vh] md:min-h-screen bg-black bg-opacity-50 text-white container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Manage Your School Effortlessly
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center">
          Simplify administrative tasks, enhance learning, and improve
          communication with our all-in-one school management system.
        </p>
        <div className="space-x-4">
          <a
            href="/register"
            className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded"
          >
            Sign Up
          </a>
          <a
            href="/demo-request"
            className="bg-transparent border border-white hover:bg-white hover:text-black text-white py-2 px-4 rounded"
          >
            Request a Demo
          </a>
        </div>
      </div>
    </div>
  );
}
