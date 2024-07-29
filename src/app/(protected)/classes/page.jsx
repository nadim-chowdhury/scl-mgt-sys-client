"use client";

import { useMutation, useQuery } from "@apollo/client";
import { classesDemoData } from "@/utils/classes-demo-data";
import { GET_CLASSES } from "../../../graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { useState } from "react";
import { CREATE_CLASS } from "@/graphql/mutation";

export default function Classes() {
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const { loading, error, data } = useQuery(GET_CLASSES);
  console.log("🚀 ~ Classes ~ data:", data);
  const [createClass] = useMutation(CREATE_CLASS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClass({
      variables: { name, teacherId: parseInt(teacherId) },
    });
    setName("");
    setTeacherId("");
  };

  return (
    <div>
      <Heading title="Classes" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-indigo-50 p-6 rounded-md border mb-8"
      >
        <input
          id="class-name"
          name="class-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
          placeholder="Class Name"
        />
        <input
          id="teacher-id"
          name="teacher-id"
          type="text"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
          placeholder="Teacher ID"
        />

        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded"
        >
          Add Class
        </button>
      </form>

      <Heading title="All Class" />
      <div className="grid grid-cols-4 gap-6">
        {classesDemoData.map((classItem) => (
          <div
            key={classItem?.id}
            className="border p-6 rounded-md bg-amber-50"
          >
            <p className="font-semibold mb-2">{classItem?.name}</p>
            <p className="text-gray-600">Teacher: {classItem?.teacher.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
