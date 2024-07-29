"use client";

import { useQuery } from "@apollo/client";
import { Pie } from "react-chartjs-2";
import { GET_FINANCIAL_REPORT } from "@/graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import "chart.js/auto";
import { financialReportsMockData } from "@/utils/demoData";

export default function FinancialReport() {
  const { loading, error, data } = useQuery(GET_FINANCIAL_REPORT);
  console.log("🚀 ~ FinancialReport ~ data:", data);

  const chartData = {
    labels: ["Total Fees", "Total Payments", "Outstanding Amount"],
    datasets: [
      {
        label: "Financial Data",
        data: [
          financialReportsMockData?.totalFees,
          financialReportsMockData?.totalPayments,
          financialReportsMockData?.outstandingAmount,
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
    <div>
      <Heading title="Financial Report" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <div className="mb-8">
        <Pie data={chartData} />
      </div>

      <div className="text-lg space-y-2">
        <p>
          <strong>Total Fees:</strong> $
          {financialReportsMockData?.totalFees?.toFixed(2)}
        </p>
        <p>
          <strong>Total Payments:</strong> $
          {financialReportsMockData?.totalPayments?.toFixed(2)}
        </p>
        <p>
          <strong>Outstanding Amount:</strong> $
          {financialReportsMockData?.outstandingAmount?.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
