import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_PAYMENTS = gql`
  query GetPayments {
    payments {
      id
      amount
      paymentDate
      method
      fee {
        amount
        user {
          username
        }
      }
    }
  }
`;

const CREATE_PAYMENT = gql`
  mutation CreatePayment($feeId: Int!, $amount: Float!, $method: String!) {
    createPayment(feeId: $feeId, amount: $amount, method: $method) {
      id
      amount
      paymentDate
      method
    }
  }
`;

export default function Payments() {
  const { loading, error, data } = useQuery(GET_PAYMENTS);
  const [createPayment] = useMutation(CREATE_PAYMENT);
  const [feeId, setFeeId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    await createPayment({
      variables: { feeId: parseInt(feeId), amount: parseFloat(amount), method },
    });
    setFeeId("");
    setAmount("");
    setMethod("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Payments</h1>
      <form onSubmit={handleCreatePayment}>
        <input
          type="number"
          placeholder="Fee ID"
          value={feeId}
          onChange={(e) => setFeeId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <button type="submit">Create Payment</button>
      </form>
      <ul>
        {data.payments.map((payment) => (
          <li key={payment.id}>
            Fee: {payment.fee.amount}, User: {payment.fee.user.username},
            Amount: {payment.amount}, Date: {payment.paymentDate}, Method:{" "}
            {payment.method}
          </li>
        ))}
      </ul>
    </div>
  );
}
