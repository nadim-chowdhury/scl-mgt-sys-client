import Link from "next/link";

export default function DashboardHome() {
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-4">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dashboard Cards */}
        <div className="bg-white border p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Students</h2>
          <p className="text-gray-600">
            Manage students, view attendance, grades, etc.
          </p>
          <Link href="/students">
            <span className="text-indigo-600 hover:underline mt-2 inline-block">
              View Students
            </span>
          </Link>
        </div>
        <div className="bg-white border p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Teachers</h2>
          <p className="text-gray-600">
            Manage teachers, assignments, schedules, etc.
          </p>
          <Link href="/teachers">
            <span className="text-indigo-600 hover:underline mt-2 inline-block">
              View Teachers
            </span>
          </Link>
        </div>
        <div className="bg-white border p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Classes</h2>
          <p className="text-gray-600">
            Manage classes, schedules, assignments, etc.
          </p>
          <Link href="/classes">
            <span className="text-indigo-600 hover:underline mt-2 inline-block">
              View Classes
            </span>
          </Link>
        </div>
        <div className="bg-white border p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Attendance</h2>
          <p className="text-gray-600">
            Track attendance records of students and teachers.
          </p>
          <Link href="/attendance">
            <span className="text-indigo-600 hover:underline mt-2 inline-block">
              View Attendance
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
