import { useQuery, gql } from "@apollo/client";

const GET_PAYMENTS = gql`
  query GetPayments {
    payments {
      id
      amount
      paymentDate
      method
      fee {
        id
        amount
        user {
          username
        }
      }
    }
  }
`;

export default function PaymentHistory() {
  const { loading, error, data } = useQuery(GET_PAYMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Payment History</h1>
      <ul>
        {data.payments.map((payment) => (
          <li key={payment.id}>
            User: {payment.fee.user.username}, Fee Amount: {payment.fee.amount},
            Payment Amount: {payment.amount}, Date: {payment.paymentDate},
            Method: {payment.method}
          </li>
        ))}
      </ul>
    </div>
  );
}
