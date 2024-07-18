"use client";

import { useState } from "react";
import { CREATE_SUBJECT } from "../../../graphql/mutation";
import { useMutation } from "@apollo/client";

export default function CreateSubject() {
  const [name, setName] = useState("");
  const [classId, setClassId] = useState("");

  const [createSubject] = useMutation(CREATE_SUBJECT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSubject({ variables: { name, classId: parseInt(classId) } });
    setName("");
    setClassId("");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder="Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:bg-amber-600"
        >
          Create Subject
        </button>
      </form>
    </div>
  );
}
