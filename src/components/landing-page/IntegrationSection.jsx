export default function IntegrationSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Integration</h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore how our system integrates with other software and systems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg  p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Compatibility
            </h3>
            <ul className="text-gray-600">
              <li className="mb-2">
                <svg
                  className="w-6 h-6 text-amber-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Google Workspace
              </li>
              <li className="mb-2">
                <svg
                  className="w-6 h-6 text-amber-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Microsoft Office 365
              </li>
              <li className="mb-2">
                <svg
                  className="w-6 h-6 text-amber-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Zoom
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-lg  p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              API Information
            </h3>
            <p className="text-gray-600">
              Our system offers a comprehensive API that allows seamless
              integration with other platforms and systems. For more information
              about our API endpoints and documentation, please visit our
              developer portal.
            </p>
            <div className="mt-4">
              <a
                href="/api-docs"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
              >
                API Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
