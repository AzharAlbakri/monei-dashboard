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

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={onBack}
      >
        Back to Payments List
      </button>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold">Payment Details</h1>
        <p>
          <strong>ID:</strong> {payment.id}
        </p>
        <p>
          <strong>Amount:</strong> ${payment.amount}
        </p>
        <p>
          <strong>Status:</strong> {payment.status}
        </p>
        <p>
          <strong>Created At:</strong> {formatDate(payment.createdAt)}
        </p>

        <div>
          <strong>Metadata:</strong>
          {payment.metadata.length > 0 ? (
            <ul className="list-disc ml-6">
              {payment.metadata.map((item) => (
                <li key={item.key}>
                  {item.key}: {item.value}
                </li>
              ))}
            </ul>
          ) : (
            <p>-</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePaymentView;
