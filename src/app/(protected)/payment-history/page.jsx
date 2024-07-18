"use client";

import { useQuery } from "@apollo/client";
import { GET_PAYMENT_HISTORY } from "@/graphql/query";

export default function PaymentHistory() {
  const { loading, error, data } = useQuery(GET_PAYMENT_HISTORY);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Payment History</h1>
      <ul className="space-y-4">
        {data.payments.map((payment) => (
          <li key={payment.id} className="p-4 border border-gray-300 rounded">
            <p className="text-lg">
              <strong>User:</strong> {payment.fee.user.username}
            </p>
            <p>
              <strong>Fee Amount:</strong> {payment.fee.amount}
            </p>
            <p>
              <strong>Payment Amount:</strong> {payment.amount}
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
  );
}
