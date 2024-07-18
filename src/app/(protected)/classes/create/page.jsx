"use client";

import { CREATE_CLASS } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useState } from "react";

export default function CreateClass() {
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const [createClass] = useMutation(CREATE_CLASS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClass({ variables: { name, teacherId: parseInt(teacherId) } });
    setName("");
    setTeacherId("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg mx-4">
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Classes
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="class-name" className="sr-only">
                Class Name
              </label>
              <input
                id="class-name"
                name="class-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Class Name"
              />
            </div>
            <div>
              <label htmlFor="teacher-id" className="sr-only">
                Teacher ID
              </label>
              <input
                id="teacher-id"
                name="teacher-id"
                type="text"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Teacher ID"
              />
            </div>
          </div>
          <button
            type="submit"
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md group hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
}
