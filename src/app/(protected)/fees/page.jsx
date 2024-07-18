"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FEES } from "@/graphql/query";
import { CREATE_FEE, UPDATE_FEE_STATUS } from "@/graphql/mutation";

export default function Fees() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [feeId, setFeeId] = useState("");
  const [status, setStatus] = useState("");

  const { loading, error, data } = useQuery(GET_FEES);
  const [createFee] = useMutation(CREATE_FEE);
  const [updateFeeStatus] = useMutation(UPDATE_FEE_STATUS);

  const handleCreateFee = async (e) => {
    e.preventDefault();
    await createFee({
      variables: {
        userId: parseInt(userId),
        amount: parseFloat(amount),
        dueDate,
      },
    });
    setUserId("");
    setAmount("");
    setDueDate("");
  };

  const handleUpdateFeeStatus = async (e) => {
    e.preventDefault();
    await updateFeeStatus({ variables: { id: parseInt(feeId), status } });
    setFeeId("");
    setStatus("");
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Fees</h1>
      <form onSubmit={handleCreateFee} className="mb-8">
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
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Fee
        </button>
      </form>
      <form onSubmit={handleUpdateFeeStatus} className="mb-8">
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
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Fee Status
        </button>
      </form>
      <ul className="space-y-4">
        {data.fees.map((fee) => (
          <li key={fee.id} className="p-4 border border-gray-300 rounded">
            <p className="text-lg">
              <strong>User:</strong> {fee.user.username}
            </p>
            <p>
              <strong>Amount:</strong> {fee.amount}
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
  );
}
