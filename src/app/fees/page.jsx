import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_FEES = gql`
  query GetFees {
    fees {
      id
      amount
      dueDate
      status
      user {
        username
      }
    }
  }
`;

const CREATE_FEE = gql`
  mutation CreateFee($userId: Int!, $amount: Float!, $dueDate: String!) {
    createFee(userId: $userId, amount: $amount, dueDate: $dueDate) {
      id
      amount
      dueDate
      status
    }
  }
`;

const UPDATE_FEE_STATUS = gql`
  mutation UpdateFeeStatus($id: Int!, $status: String!) {
    updateFeeStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export default function Fees() {
  const { loading, error, data } = useQuery(GET_FEES);
  const [createFee] = useMutation(CREATE_FEE);
  const [updateFeeStatus] = useMutation(UPDATE_FEE_STATUS);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [feeId, setFeeId] = useState("");
  const [status, setStatus] = useState("");

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fees</h1>
      <form onSubmit={handleCreateFee}>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Create Fee</button>
      </form>
      <form onSubmit={handleUpdateFeeStatus}>
        <input
          type="number"
          placeholder="Fee ID"
          value={feeId}
          onChange={(e) => setFeeId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button type="submit">Update Fee Status</button>
      </form>
      <ul>
        {data.fees.map((fee) => (
          <li key={fee.id}>
            User: {fee.user.username}, Amount: {fee.amount}, Due: {fee.dueDate},
            Status: {fee.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
