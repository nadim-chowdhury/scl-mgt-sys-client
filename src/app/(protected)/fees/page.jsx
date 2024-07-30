"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FEES } from "@/graphql/query";
import { CREATE_FEE, UPDATE_FEE_STATUS } from "@/graphql/mutation";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { feesMockData } from "@/utils/demoData";

export default function Fees() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [feeId, setFeeId] = useState("");
  const [status, setStatus] = useState("");

  const { loading, error, data } = useQuery(GET_FEES);
  console.log("🚀 ~ Fees ~ data:", data);
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

  return (
    <div>
      <Heading title="Fees" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <div className="grid grid-cols-2 gap-6">
        <form
          onSubmit={handleCreateFee}
          className="mb-8 bg-indigo-50 p-6 rounded-md border"
        >
          <div className="mb-4">
            <input
              type="number"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="form__input__field"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form__input__field"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              placeholder="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form__input__field"
            />
          </div>
          <button type="submit" className="form__submit__button">
            Create Fee
          </button>
        </form>

        <form
          onSubmit={handleUpdateFeeStatus}
          className="mb-8 bg-indigo-50 p-6 rounded-md border"
        >
          <div className="mb-4">
            <input
              type="number"
              placeholder="Fee ID"
              value={feeId}
              onChange={(e) => setFeeId(e.target.value)}
              className="form__input__field"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form__input__field"
            />
          </div>

          <button type="submit" className="form__submit__button">
            Update Fee Status
          </button>
        </form>
      </div>

      <Heading title="Created Fees" />
      <div className="grid grid-cols-4 gap-6">
        {feesMockData?.map((fee) => (
          <div key={fee?.id} className="p-4 border  rounded bg-amber-50">
            <p className="text-lg">
              <strong>User:</strong> {fee?.user?.username}
            </p>
            <p>
              <strong>Amount:</strong> {fee?.amount}
            </p>
            <p>
              <strong>Due:</strong> {fee?.dueDate}
            </p>
            <p>
              <strong>Status:</strong> {fee?.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
