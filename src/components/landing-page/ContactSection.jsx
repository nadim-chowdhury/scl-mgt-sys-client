import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Get in touch with us for any inquiries or assistance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg  p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Form
            </h3>

            <ContactForm />
          </div>
          <div className="bg-white rounded-lg  p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Support Information
            </h3>
            <p className="text-gray-600 mb-4">
              For support inquiries, please contact us via:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Email: support@example.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>
                Live Chat:{" "}
                <a href="/live-chat" className="bg-amber-600">
                  Start Live Chat
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
