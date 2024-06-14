import { useQuery, gql } from "@apollo/client";

const GET_FEES_AND_PAYMENTS = gql`
  query GetFeesAndPayments {
    fees {
      id
      amount
      dueDate
      status
      user {
        username
      }
    }
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

export default function FinancialReports() {
  const { loading, error, data } = useQuery(GET_FEES_AND_PAYMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalFees = data.fees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPayments = data.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <div>
      <h1>Financial Reports</h1>
      <h2>Total Fees: ${totalFees}</h2>
      <h2>Total Payments: ${totalPayments}</h2>
      <h3>Fees</h3>
      <ul>
        {data.fees.map((fee) => (
          <li key={fee.id}>
            User: {fee.user.username}, Amount: {fee.amount}, Due: {fee.dueDate},
            Status: {fee.status}
          </li>
        ))}
      </ul>
      <h3>Payments</h3>
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
