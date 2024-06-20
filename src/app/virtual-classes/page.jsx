"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_VIRTUAL_CLASSES } from "@/graphql/query";
import { CREATE_VIRTUAL_CLASS, UPDATE_SCHEDULE } from "@/graphql/mutation";

export default function VirtualClasses() {
  const [meetingLink, setMeetingLink] = useState("");
  const [schedule, setSchedule] = useState("");
  const [courseId, setCourseId] = useState("");
  const [classId, setClassId] = useState("");

  const { loading, error, data } = useQuery(GET_VIRTUAL_CLASSES);
  const [createVirtualClass] = useMutation(CREATE_VIRTUAL_CLASS);
  const [updateSchedule] = useMutation(UPDATE_SCHEDULE);

  const handleCreateVirtualClass = async (e) => {
    e.preventDefault();
    await createVirtualClass({
      variables: { meetingLink, schedule, courseId: parseInt(courseId) },
    });
    setMeetingLink("");
    setSchedule("");
    setCourseId("");
  };

  const handleUpdateSchedule = async (e) => {
    e.preventDefault();
    await updateSchedule({ variables: { id: parseInt(classId), schedule } });
    setClassId("");
    setSchedule("");
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Virtual Classes</h1>
      <form onSubmit={handleCreateVirtualClass} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Meeting Link"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="datetime-local"
          placeholder="Schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Virtual Class
        </button>
      </form>
      <form onSubmit={handleUpdateSchedule} className="mb-8 space-y-4">
        <input
          type="number"
          placeholder="Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="datetime-local"
          placeholder="New Schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Schedule
        </button>
      </form>
      <ul className="space-y-6">
        {data.virtualClasses.map((virtualClass) => (
          <li
            key={virtualClass.id}
            className="p-4 border border-gray-300 rounded"
          >
            <p className="mb-2">
              Meeting Link:{" "}
              <a
                href={virtualClass.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Join
              </a>
            </p>
            <p className="mb-1">Schedule: {virtualClass.schedule}</p>
            <p className="mb-1">Course: {virtualClass.course.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
