// src/components/SinglePaymentView.tsx
import React from "react";

interface Payment {
  id: string;
  amount: number;
  status: string;
  createdAt: number;
  metadata: { key: string; value: string }[];
}

interface Props {
  payment: Payment | null;
  onBack: () => void;
}

const SinglePaymentView: React.FC<Props> = ({ payment, onBack }) => {
  if (!payment) return null;

  const formatDate = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleString();
  const formatCurrency = (amount: number) =>
    amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 text-sm font-semibold rounded-full";
    if (status === "paid") return `${base} bg-green-100 text-green-700`;
    if (status === "failed") return `${base} bg-red-100 text-red-700`;
    return `${base} bg-yellow-100 text-yellow-700`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back to Payments
        </button>

        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Payment Details</h1>
            <span className={getStatusBadge(payment.status)}>
              {payment.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Payment ID</p>
              <p className="font-medium">{payment.id}</p>
            </div>

            <div>
              <p className="text-gray-500">Amount</p>
              <p className="font-medium">{formatCurrency(payment.amount)}</p>
            </div>

            <div>
              <p className="text-gray-500">Created At</p>
              <p className="font-medium">{formatDate(payment.createdAt)}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 mb-2">Metadata</p>
            {payment.metadata.length > 0 ? (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                {payment.metadata.map((item) => (
                  <div key={item.key} className="flex justify-between">
                    <span className="text-gray-600">{item.key}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No metadata available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePaymentView;
