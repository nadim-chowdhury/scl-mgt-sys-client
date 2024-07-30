"use client";

import { useMutation, useQuery } from "@apollo/client";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { GET_ATTENDANCE_REPORT } from "@/graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { attendanceReportMockData } from "@/utils/demoData";
import { MARK_ATTENDANCE } from "@/graphql/mutation";
import { useState } from "react";

export default function AttendanceReport() {
  const [classId, setClassId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const { loading, error, data } = useQuery(GET_ATTENDANCE_REPORT);
  console.log("🚀 ~ AttendanceReport ~ data:", data);
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

  const chartData = {
    labels: [
      ...new Set(attendanceReportMockData?.map((report) => report.date)),
    ],
    datasets: [
      {
        label: "Present",
        data: attendanceReportMockData?.map((report) =>
          report.status === "Present" ? 1 : 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Absent",
        data: attendanceReportMockData?.map((report) =>
          report.status === "Absent" ? 1 : 0
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div>
      <Heading title="Attendance Report" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-indigo-50 p-6 rounded-md border mb-8"
      >
        <input
          type="number"
          placeholder="Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="form__input__field"
        />
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="form__input__field"
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form__input__field"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form__input__field"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Mark Attendance
        </button>
      </form>

      <Heading title="Report Chart" />
      <div className="border p-6 rounded-md mb-8">
        <Bar data={chartData} />
      </div>

      <Heading title="Report List" />
      <div className="grid grid-cols-4 gap-6">
        {attendanceReportMockData?.map((report, index) => (
          <div key={index} className="p-6 border rounded-md bg-amber-50">
            <p className="mb-1">
              <strong>Student:</strong> {report?.student}
            </p>
            <p className="mb-1">
              <strong>Class:</strong> {report?.class}
            </p>
            <p className="mb-1">
              <strong>Date:</strong> {report?.date}
            </p>
            <p
              className={`mb-1 ${
                report?.status === "Present" ? "text-amber-500" : "text-red-500"
              }`}
            >
              <strong>Status:</strong> {report?.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
