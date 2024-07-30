"use client";

import { useQuery } from "@apollo/client";
import { GET_PAYMENT_HISTORY } from "@/graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { paymentsHistoryMockData } from "@/utils/demoData";

export default function PaymentHistory() {
  const { loading, error, data } = useQuery(GET_PAYMENT_HISTORY);
  console.log("🚀 ~ PaymentHistory ~ data:", data);

  return (
    <div>
      <Heading title="Payment History" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <div className="grid grid-cols-4 gap-6">
        {paymentsHistoryMockData?.map((payment) => (
          <div key={payment?.id} className="p-4 border rounded-md bg-amber-50">
            <p className="text-lg">
              <strong>User:</strong> {payment?.fee?.user?.username}
            </p>
            <p>
              <strong>Fee Amount:</strong> {payment?.fee?.amount}
            </p>
            <p>
              <strong>Payment Amount:</strong> {payment?.amount}
            </p>
            <p>
              <strong>Date:</strong> {payment?.paymentDate}
            </p>
            <p>
              <strong>Method:</strong> {payment?.method}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
