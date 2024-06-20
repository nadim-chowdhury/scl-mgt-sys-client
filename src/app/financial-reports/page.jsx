"use client";

import { GET_FEES_AND_PAYMENTS } from "@/graphql/query";
import { useQuery } from "@apollo/client";

export default function FinancialReports() {
  const { loading, error, data } = useQuery(GET_FEES_AND_PAYMENTS);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );

  const totalFees = data.fees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPayments = data.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Reports</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Total Fees: ${totalFees.toFixed(2)}
      </h2>
      <h2 className="text-2xl font-semibold mb-6">
        Total Payments: ${totalPayments.toFixed(2)}
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Fees</h3>
        <ul className="space-y-4">
          {data.fees.map((fee) => (
            <li key={fee.id} className="p-4 border border-gray-300 rounded">
              <p>
                <strong>User:</strong> {fee.user.username}
              </p>
              <p>
                <strong>Amount:</strong> ${fee.amount.toFixed(2)}
              </p>
              <p>
                <strong>Due:</strong> {fee.dueDate}
              </p>
              <p>
                <strong>Status:</strong> {fee.status}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Payments</h3>
        <ul className="space-y-4">
          {data.payments.map((payment) => (
            <li key={payment.id} className="p-4 border border-gray-300 rounded">
              <p>
                <strong>Fee:</strong> ${payment.fee.amount.toFixed(2)}
              </p>
              <p>
                <strong>User:</strong> {payment.fee.user.username}
              </p>
              <p>
                <strong>Amount:</strong> ${payment.amount.toFixed(2)}
              </p>
              <p>
                <strong>Date:</strong> {payment.paymentDate}
              </p>
              <p>
                <strong>Method:</strong> {payment.method}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
