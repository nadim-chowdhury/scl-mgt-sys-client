"use client";

import { useQuery } from "@apollo/client";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { GET_ATTENDANCE_REPORT } from "@/graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";

export default function AttendanceReport() {
  const { loading, error, data } = useQuery(GET_ATTENDANCE_REPORT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const presentData = data.attendanceReport.filter(
    (report) => report.status === "Present"
  );
  const absentData = data.attendanceReport.filter(
    (report) => report.status === "Absent"
  );

  const chartData = {
    labels: [...new Set(data.attendanceReport.map((report) => report.date))],
    datasets: [
      {
        label: "Present",
        data: presentData.map((report) =>
          report.status === "Present" ? 1 : 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Absent",
        data: absentData.map((report) => (report.status === "Absent" ? 1 : 0)),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div>
      <Heading title="Attendance Report" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <Bar data={chartData} />
      
      <ul>
        {data?.attendanceReport?.map((report, index) => (
          <li key={index}>
            <p>Student: {report?.student}</p>
            <p>Class: {report?.class}</p>
            <p>Date: {report?.date}</p>
            <p>Status: {report?.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
