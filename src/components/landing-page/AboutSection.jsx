export default function AboutSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            About Our System
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Learn more about the history, mission, and vision of our school
            management system.
          </p>
        </div>
        <div className="bg-white rounded-lg  p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our History</h3>
          <p className="text-gray-600">
            Our school management system was founded with the vision to
            revolutionize the way schools manage their daily operations. From
            humble beginnings as a small startup, we have grown into a
            comprehensive platform that serves educational institutions
            worldwide. Our system is designed to streamline administrative
            tasks, enhance learning experiences, and improve communication
            between staff, students, and parents.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg  p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              Our mission is to empower educational institutions with innovative
              tools and solutions that simplify management, enhance learning
              outcomes, and foster a collaborative environment. We strive to be
              the leading provider of school management systems, continually
              evolving to meet the needs of our users.
            </p>
          </div>
          <div className="bg-white rounded-lg  p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600">
              Our vision is to create a world where educational institutions can
              operate seamlessly and efficiently, allowing educators to focus on
              what matters most – teaching and inspiring students. We envision a
              future where our system is an integral part of schools globally,
              contributing to the success and growth of the educational
              community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
