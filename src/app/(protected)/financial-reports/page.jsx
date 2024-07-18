"use client";

import { useQuery } from "@apollo/client";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { GET_FINANCIAL_REPORT } from "@/graphql/query";

export default function FinancialReport() {
  const { loading, error, data } = useQuery(GET_FINANCIAL_REPORT);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );

  const chartData = {
    labels: ["Total Fees", "Total Payments", "Outstanding Amount"],
    datasets: [
      {
        label: "Financial Data",
        data: [
          data.financialReport.totalFees,
          data.financialReport.totalPayments,
          data.financialReport.outstandingAmount,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Financial Report</h1>
      <div className="mb-8">
        <Pie data={chartData} />
      </div>
      <div className="text-lg space-y-2">
        <p>
          <strong>Total Fees:</strong> $
          {data.financialReport.totalFees.toFixed(2)}
        </p>
        <p>
          <strong>Total Payments:</strong> $
          {data.financialReport.totalPayments.toFixed(2)}
        </p>
        <p>
          <strong>Outstanding Amount:</strong> $
          {data.financialReport.outstandingAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
