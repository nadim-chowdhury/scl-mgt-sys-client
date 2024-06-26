import { useQuery, gql } from "@apollo/client";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const GET_FINANCIAL_REPORT = gql`
  query GetFinancialReport {
    financialReport {
      totalFees
      totalPayments
      outstandingAmount
    }
  }
`;

export default function FinancialReport() {
  const { loading, error, data } = useQuery(GET_FINANCIAL_REPORT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
    <div>
      <h1>Financial Report</h1>
      <Pie data={chartData} />
      <p>Total Fees: {data.financialReport.totalFees}</p>
      <p>Total Payments: {data.financialReport.totalPayments}</p>
      <p>Outstanding Amount: {data.financialReport.outstandingAmount}</p>
    </div>
  );
}
