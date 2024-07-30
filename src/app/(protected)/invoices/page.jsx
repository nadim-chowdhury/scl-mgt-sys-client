"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INVOICES } from "../../../graphql/query";
import { CREATE_INVOICE } from "@/graphql/mutation";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { invoicesMockData } from "@/utils/demoData";

export default function Invoices() {
  const [userId, setUserId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [amount, setAmount] = useState("");

  const { loading, error, data } = useQuery(GET_INVOICES);
  console.log("🚀 ~ Invoices ~ data:", data);
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
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <form
        onSubmit={handleSubmit}
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
            placeholder="Payment ID"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
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
        <button type="submit" className="form__submit__button">
          Create Invoice
        </button>
      </form>

      <Heading title="All Invoices" />
      <div className="grid grid-cols-4 gap-6">
        {invoicesMockData?.map((invoice) => (
          <div key={invoice?.id} className="p-4 border  rounded bg-amber-50">
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
          </div>
        ))}
      </div>
    </div>
  );
}
