import { useQuery } from "@apollo/client";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { GET_ATTENDANCE_REPORT } from "../../../graphql/query";

export default function AttendanceReport() {
  const { loading, error, data } = useQuery(GET_ATTENDANCE_REPORT);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );

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
        data: data.attendanceReport.map((report) =>
          report.status === "Present" ? 1 : 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Absent",
        data: data.attendanceReport.map((report) =>
          report.status === "Absent" ? 1 : 0
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Attendance Report</h1>
      <div className="mb-8">
        <Bar data={chartData} />
      </div>
      <ul className="space-y-6">
        {data.attendanceReport.map((report, index) => (
          <li key={index} className="p-4 border border-gray-300 rounded">
            <p className="mb-1">
              <strong>Student:</strong> {report.student}
            </p>
            <p className="mb-1">
              <strong>Class:</strong> {report.class}
            </p>
            <p className="mb-1">
              <strong>Date:</strong> {report.date}
            </p>
            <p
              className={`mb-1 ${
                report.status === "Present" ? "text-green-500" : "text-red-500"
              }`}
            >
              <strong>Status:</strong> {report.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
