"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TIMETABLE } from "@/graphql/mutation";

export default function CreateTimeTable() {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [createTimetable] = useMutation(CREATE_TIMETABLE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTimetable({
      variables: {
        classId: parseInt(classId),
        subjectId: parseInt(subjectId),
        day,
        startTime,
        endTime,
      },
    });
    setClassId("");
    setSubjectId("");
    setDay("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Timetable</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Enter Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="subjectId"
            className="block text-sm font-medium text-gray-700"
          >
            Subject ID
          </label>
          <input
            id="subjectId"
            type="number"
            placeholder="Enter Subject ID"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="day"
            className="block text-sm font-medium text-gray-700"
          >
            Day
          </label>
          <input
            id="day"
            type="text"
            placeholder="Enter Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            id="startTime"
            type="text"
            placeholder="Enter Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            End Time
          </label>
          <input
            id="endTime"
            type="text"
            placeholder="Enter End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          Create Timetable
        </button>
      </form>
    </div>
  );
}
