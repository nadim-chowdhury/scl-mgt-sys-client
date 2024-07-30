"use client";

import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { CREATE_SUBJECT } from "@/graphql/mutation";
import { GET_SUBJECTS } from "@/graphql/query";
import { subjectsDemoData } from "@/utils/demoData";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

export default function Subjects() {
  const [name, setName] = useState("");
  const [classId, setClassId] = useState("");

  const { loading, error, data } = useQuery(GET_SUBJECTS);
  console.log("🚀 ~ Subjects ~ data:", data);
  const [createSubject] = useMutation(CREATE_SUBJECT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSubject({ variables: { name, classId: parseInt(classId) } });
    setName("");
    setClassId("");
  };

  return (
    <div>
      <Heading title="Subjects" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-indigo-50 p-6 rounded-md border space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Subject Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 block w-full px-3 py-2 border  rounded-md  focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Subject Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="classId"
            className="block text-sm font-medium text-gray-700"
          >
            Class ID
          </label>
          <input
            id="classId"
            type="number"
            className="mt-1 block w-full px-3 py-2 border  rounded-md  focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:bg-amber-600"
        >
          Create Subject
        </button>
      </form>

      <Heading title="All Subjects" />
      <div className="grid grid-cols-3 gap-6">
        {subjectsDemoData?.map((subject) => (
          <div key={subject?.id} className="p-4 border rounded-md bg-amber-50">
            <h3 className="font-bold">{subject?.name}</h3>
            <span>{subject?.class?.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
