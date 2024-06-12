import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/">
            <span className="text-white text-xl font-bold">SCLMGTSYS</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            {/* Navigation Links */}
            <Link href="/features">
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Features
              </span>
            </Link>
            <Link href="/pricing">
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </span>
            </Link>
            <Link href="/about">
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </span>
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          {/* Login and Register Buttons */}
          <div className="ml-4 flex items-center md:ml-6">
            <Link href="/login">
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Log In
              </span>
            </Link>
            <Link href="/register">
              <span className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
