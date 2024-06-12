export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="list-none">
              <li className="mb-2">
                <a href="/features" className="hover:text-gray-400">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a href="/pricing" className="hover:text-gray-400">
                  Pricing
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <ul className="list-none">
              <li className="mb-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  Twitter
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  LinkedIn
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="py-2 px-4 rounded-l bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 rounded-r"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex justify-between items-center">
          <p>&copy; 2024 Your School Management System. All rights reserved.</p>
          <div>
            <a href="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="/terms-of-service" className="hover:text-gray-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
