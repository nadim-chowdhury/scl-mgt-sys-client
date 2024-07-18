"use client";

import { useQuery } from "@apollo/client";
import { GET_TIMETABLES } from "@/graphql/query";

export default function Timetable() {
  const { loading, error, data } = useQuery(GET_TIMETABLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Timetable</h1>

      <ul className="divide-y divide-gray-300">
        {data.timetables.map((tt) => (
          <li key={tt.id} className="py-2">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-lg font-semibold">{tt.subject.name}</p>
                <p className="text-sm text-gray-600">{tt.class.name}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm">Day: {tt.day}</p>
                <p className="text-sm">
                  Time: {tt.startTime} - {tt.endTime}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
