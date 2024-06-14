import Image from "next/image";

const demos = [
  {
    id: 1,
    title: "Dashboard Overview",
    type: "video",
    src: "/path-to-dashboard-video.mp4",
    thumbnail: "/path-to-dashboard-thumbnail.jpg",
  },
  {
    id: 2,
    title: "Student Management",
    type: "image",
    src: "/path-to-student-management.jpg",
  },
  {
    id: 3,
    title: "Teacher Management",
    type: "image",
    src: "/path-to-teacher-management.jpg",
  },
  {
    id: 4,
    title: "Class Scheduling",
    type: "image",
    src: "/path-to-class-scheduling.jpg",
  },
];

export default function ProductDemosSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Product Demos
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore the features of our school management system through these
            screenshots and videos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {demos.map((demo) => (
            <div key={demo.id} className="bg-gray-100 rounded-lg  p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {demo.title}
              </h3>
              {demo.type === "video" ? (
                <video
                  className="w-full h-auto rounded-lg"
                  controls
                  poster={demo.thumbnail}
                >
                  <source src={demo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={demo.src}
                  alt={demo.title}
                  className="w-full h-auto rounded-lg"
                  width={1280}
                  height={720}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="/interactive-demo"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Interactive Demo
          </a>
        </div>
      </div>
    </section>
  );
}
