"use client";

import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Academic Performance Report</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
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
          Generate Report
        </button>
      </form>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && (
        <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
      )}
      {data && (
        <div>
          <div className="mb-8">
            <Bar data={chartData} />
          </div>
          <ul className="space-y-6">
            {data.academicPerformanceReport.map((report, index) => (
              <li key={index} className="p-4 border border-gray-300 rounded">
                <h2 className="text-xl font-bold mb-2">
                  {report.assignmentTitle}
                </h2>
                <p className="mb-1">Submissions: {report.submissions}</p>
                <p className="mb-1">Average Score: {report.averageScore}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
