"use client";

import { useQuery } from "@apollo/client";
import { classesDemoData } from "@/utils/classes-demo-data";
import { GET_CLASSES } from "../../../graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";

export default function Classes() {
  const { loading, error, data } = useQuery(GET_CLASSES);

  return (
    <div>
      <Heading title="Classes" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <div className="grid grid-cols-4 gap-6">
        {(data?.getClasses || classesDemoData).map((classItem) => (
          <div key={classItem.id} className="p-4 border rounded-md shadow-sm">
            <p className="font-semibold">{classItem.name}</p>
            <p className="text-gray-600">Teacher: {classItem.teacher.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
