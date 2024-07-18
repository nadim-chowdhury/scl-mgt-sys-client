"use client";

import { useQuery } from "@apollo/client";
import { GET_CLASSES } from "../../../graphql/query";

export default function Classes() {
  const { loading, error, data } = useQuery(GET_CLASSES);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg mx-4">
        <ul className="mt-8 space-y-4">
          {data?.getClasses?.map((classItem) => (
            <li key={classItem.id} className="p-4 border rounded-md shadow-sm">
              {classItem.name} - {classItem.teacher.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
