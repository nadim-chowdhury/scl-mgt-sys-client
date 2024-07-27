"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INVOICES } from "../../../graphql/query";
import { CREATE_INVOICE } from "@/graphql/mutation";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";

export default function Invoices() {
  const [userId, setUserId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [amount, setAmount] = useState("");

  const { loading, error, data } = useQuery(GET_INVOICES);
  const [createInvoice] = useMutation(CREATE_INVOICE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createInvoice({
      variables: {
        userId: parseInt(userId),
        paymentId: parseInt(paymentId),
        amount: parseFloat(amount),
      },
    });
    setUserId("");
    setPaymentId("");
    setAmount("");
  };

  return (
    <div>
      <Heading title="Invoices" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="number"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Payment ID"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
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
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
        >
          Create Invoice
        </button>
      </form>

      <ul className="space-y-4">
        {(data?.invoices || [])?.map((invoice) => (
          <li key={invoice?.id} className="p-4 border border-gray-300 rounded">
            <p className="text-lg">
              <strong>User:</strong> {invoice?.user?.username}
            </p>
            <p>
              <strong>Amount:</strong> {invoice?.amount}
            </p>
            <p>
              <strong>Generated At:</strong> {invoice?.generatedAt}
            </p>
            <p>
              <strong>Payment ID:</strong> {invoice?.payment?.id}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
