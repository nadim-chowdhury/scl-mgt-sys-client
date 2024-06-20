"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COURSES } from "@/graphql/query";
import { CREATE_COURSE } from "@/graphql/mutation";

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

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Course
        </button>
      </form>
      <ul className="space-y-6">
        {data.courses.map((course) => (
          <li key={course.id} className="p-4 border border-gray-300 rounded">
            <h2 className="text-2xl font-semibold mb-2">{course.name}</h2>
            <p className="mb-4">{course.description}</p>
            <h3 className="text-xl font-semibold mb-2">Assignments</h3>
            <ul className="space-y-2">
              {course.assignments.map((assignment) => (
                <li
                  key={assignment.id}
                  className="p-2 border border-gray-200 rounded"
                >
                  {assignment.title} -{" "}
                  <span className="font-medium">Due: {assignment.dueDate}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
