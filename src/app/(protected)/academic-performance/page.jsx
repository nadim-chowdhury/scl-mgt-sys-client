"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { GET_ACADEMIC_PERFORMANCE_REPORT } from "@/graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { mockAcademicPerformanceReport } from "@/utils/demoData";

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
      (data?.academicPerformanceReport || mockAcademicPerformanceReport)?.map(
        (report) => report.assignmentTitle
      ) || [],
    datasets: [
      {
        label: "Average Score",
        data:
          (
            data?.academicPerformanceReport || mockAcademicPerformanceReport
          )?.map((report) => report.averageScore) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <Heading title="Academic Performance Report" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-indigo-50 p-6 rounded-md border mb-8"
      >
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded whitespace-nowrap"
        >
          Generate Report
        </button>
      </form>

      <Heading title="Report Chart" />
      <div className="border p-6 rounded-md my-8">
        <Bar data={chartData} />
      </div>

      <Heading title="Report List" />
      <div className="grid grid-cols-3 gap-6">
        {(
          data?.academicPerformanceReport || mockAcademicPerformanceReport
        )?.map((report, index) => (
          <div key={index} className="p-6 border rounded-md bg-amber-50">
            <h2 className="text-xl font-bold mb-2">
              {report?.assignmentTitle}
            </h2>
            <p className="mb-1">Submissions: {report?.submissions}</p>
            <p className="mb-1">Average Score: {report?.averageScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
