import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_INVOICES = gql`
  query GetInvoices {
    invoices {
      id
      amount
      generatedAt
      user {
        username
      }
      payment {
        id
        amount
      }
    }
  }
`;

const CREATE_INVOICE = gql`
  mutation CreateInvoice($userId: Int!, $paymentId: Int!, $amount: Float!) {
    createInvoice(userId: $userId, paymentId: $paymentId, amount: $amount) {
      id
      amount
      generatedAt
    }
  }
`;

export default function Invoices() {
  const { loading, error, data } = useQuery(GET_INVOICES);
  const [createInvoice] = useMutation(CREATE_INVOICE);
  const [userId, setUserId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [amount, setAmount] = useState("");

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Invoices</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Payment ID"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Create Invoice</button>
      </form>
      <ul>
        {data.invoices.map((invoice) => (
          <li key={invoice.id}>
            User: {invoice.user.username}, Amount: {invoice.amount}, Generated
            At: {invoice.generatedAt}, Payment ID: {invoice.payment.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
