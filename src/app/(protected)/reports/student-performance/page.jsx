"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { GET_STUDENT_PERFORMANCE_REPORT } from "@/graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";

export default function StudentPerformanceReport() {
  const [studentId, setStudentId] = useState("");
  const { loading, error, data, refetch } = useQuery(
    GET_STUDENT_PERFORMANCE_REPORT,
    {
      variables: { studentId: parseInt(studentId) },
      skip: !studentId,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const chartData = {
    labels:
      data?.studentPerformanceReport.map((report) => report.assignmentTitle) ||
      [],
    datasets: [
      {
        label: "Grades",
        data:
          data?.studentPerformanceReport.map((report) => report.grade) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <Heading title="Student Performance Report" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button type="submit">Generate Report</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <Line data={chartData} />
          <ul>
            {data.studentPerformanceReport.map((report, index) => (
              <li key={index}>
                <h2>{report.assignmentTitle}</h2>
                <p>Grade: {report.grade}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
