"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PAYMENTS } from "@/graphql/query";
import { CREATE_PAYMENT } from "@/graphql/mutation";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";

export default function Payments() {
  const [feeId, setFeeId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const { loading, error, data } = useQuery(GET_PAYMENTS);
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
    <div className="max-w-4xl mx-auto p-4">
      <Heading title="Payments" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <form onSubmit={handleCreatePayment} className="mb-8">
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Payment
        </button>
      </form>

      <ul className="space-y-4">
        {data?.payments?.map((payment) => (
          <li key={payment?.id} className="p-4 border border-gray-300 rounded">
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
          </li>
        ))}
      </ul>
    </div>
  );
}
