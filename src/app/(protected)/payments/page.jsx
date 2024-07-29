"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PAYMENTS } from "@/graphql/query";
import { CREATE_PAYMENT } from "@/graphql/mutation";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { paymentsMockData } from "@/utils/demoData";

export default function Payments() {
  const [feeId, setFeeId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const { loading, error, data } = useQuery(GET_PAYMENTS);
  console.log("🚀 ~ Payments ~ data:", data);
  const [createPayment] = useMutation(CREATE_PAYMENT);

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    await createPayment({
      variables: { feeId: parseInt(feeId), amount: parseFloat(amount), method },
    });
    setFeeId("");
    setAmount("");
    setMethod("");
  };

  return (
    <div>
      <Heading title="Payments" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <form
        onSubmit={handleCreatePayment}
        className="mb-8 bg-indigo-50 p-6 rounded-md border"
      >
        <div className="mb-4">
          <input
            type="number"
            placeholder="Fee ID"
            value={feeId}
            onChange={(e) => setFeeId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
        >
          Create Payment
        </button>
      </form>

      <Heading title="All Payments" />
      <div className="grid grid-cols-4 gap-6">
        {paymentsMockData?.map((payment) => (
          <div
            key={payment?.id}
            className="p-4 border border-gray-300 rounded bg-amber-50"
          >
            <p className="text-lg">
              <strong>Fee:</strong> {payment?.fee?.amount}
            </p>
            <p>
              <strong>User:</strong> {payment?.fee?.user?.username}
            </p>
            <p>
              <strong>Amount:</strong> {payment?.amount}
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
