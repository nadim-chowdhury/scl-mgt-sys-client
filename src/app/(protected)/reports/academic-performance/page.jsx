"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { GET_ACADEMIC_PERFORMANCE_REPORT } from "@/graphql/query";

export default function AcademicPerformanceReport() {
  const [courseId, setCourseId] = useState("");
  const { loading, error, data, refetch } = useQuery(
    GET_ACADEMIC_PERFORMANCE_REPORT,
    {
      variables: { courseId: parseInt(courseId) },
      skip: !courseId,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const chartData = {
    labels:
      data?.academicPerformanceReport.map((report) => report.assignmentTitle) ||
      [],
    datasets: [
      {
        label: "Average Score",
        data:
          data?.academicPerformanceReport.map(
            (report) => report.averageScore
          ) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h1>Academic Performance Report</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button type="submit">Generate Report</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <Bar data={chartData} />
          <ul>
            {data.academicPerformanceReport.map((report, index) => (
              <li key={index}>
                <h2>{report.assignmentTitle}</h2>
                <p>Submissions: {report.submissions}</p>
                <p>Average Score: {report.averageScore}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
