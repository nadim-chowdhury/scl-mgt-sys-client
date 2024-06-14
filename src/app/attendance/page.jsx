"use client";

import { useQuery } from "@apollo/client";
import { GET_ATTENDANCES } from "../../graphql/query";

export default function Attendance() {
  const { loading, error, data } = useQuery(GET_ATTENDANCES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Attendance</h1>

      <ul className="divide-y divide-gray-200">
        {data.attendances.map((att) => (
          <li key={att.id} className="py-4">
            <div className="flex items-center">
              <div className="flex-grow">
                <p className="text-lg font-semibold">{att.class.name}</p>
                <p className="text-gray-500">{att.student.name}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <p className="text-gray-500">{att.date}</p>
                <p className="text-green-500">{att.status}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
