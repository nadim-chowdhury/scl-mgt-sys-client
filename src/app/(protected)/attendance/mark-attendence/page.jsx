"use client";

import { useState } from "react";
import { MARK_ATTENDANCE } from "../../../graphql/mutation";
import { useMutation } from "@apollo/client";

export default function MarkAttendance() {
  const [classId, setClassId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const [markAttendance] = useMutation(MARK_ATTENDANCE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await markAttendance({
      variables: {
        classId: parseInt(classId),
        studentId: parseInt(studentId),
        date,
        status,
      },
    });
    setClassId("");
    setStudentId("");
    setDate("");
    setStatus("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white rounded shadow-md"
      >
        <input
          type="number"
          placeholder="Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mark Attendance
        </button>
      </form>
    </div>
  );
}
