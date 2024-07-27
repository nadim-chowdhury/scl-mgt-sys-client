"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COURSES } from "../../../graphql/query";
import { CREATE_COURSE } from "@/graphql/mutation";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { coursesMockData } from "@/utils/demoData";

export default function Courses() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { loading, error, data } = useQuery(GET_COURSES);
  const [createCourse] = useMutation(CREATE_COURSE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCourse({ variables: { name, description } });
    setName("");
    setDescription("");
  };

  return (
    <div>
      <Heading title="Courses" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-indigo-50 p-6 rounded-md border mb-8"
      >
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded"
        >
          Create Course
        </button>
      </form>

      <Heading title="All Course" />
      <div className="grid grid-cols-3 gap-6">
        {(data?.courses || coursesMockData)?.map((course) => (
          <div key={course?.id} className="p-6 border rounded-md bg-amber-50">
            <h2 className="text-2xl font-semibold mb-2">{course?.name}</h2>
            <p className="mb-4">{course?.description}</p>
            <h3 className="text-xl font-semibold mb-2">Assignments</h3>

            <ul className="space-y-2">
              {(course?.assignments || [])?.map((assignment) => (
                <li
                  key={assignment?.id}
                  className="p-2 border border-gray-200 rounded"
                >
                  {assignment?.title} -{" "}
                  <span className="font-medium">
                    Due: {assignment?.dueDate}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
