import React, { useState } from "react";
import { paymentsData } from "../mockData";
import SinglePaymentView from "./SinglePaymentView";

interface Payment {
  id: string;
  amount: number;
  status: string;
  createdAt: number;
  metadata: { key: string; value: string }[];
}

const ITEMS_PER_PAGE = 2;

const PaymentsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(""); // yyyy-mm-dd
  const [endDateFilter, setEndDateFilter] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // تصفية البيانات حسب Filter
  const filteredData = paymentsData.filter((payment) => {
    const paymentDate = new Date(payment.createdAt * 1000);

    if (statusFilter && payment.status !== statusFilter) return false;
    if (startDateFilter && paymentDate < new Date(startDateFilter))
      return false;
    if (endDateFilter && paymentDate > new Date(endDateFilter)) return false;

    return true;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // SinglePaymentView
  if (selectedPayment) {
    return (
      <SinglePaymentView
        payment={selectedPayment}
        onBack={() => setSelectedPayment(null)}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Payments List</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-end mb-4">
        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            className="border rounded px-2 py-1"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Start Date</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={startDateFilter}
            onChange={(e) => {
              setStartDateFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">End Date</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={endDateFilter}
            onChange={(e) => {
              setEndDateFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4">ID</th>
              <th className="text-left py-2 px-4">Amount</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Date</th>
              <th className="text-left py-2 px-4">Reference</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((payment) => (
              <tr
                key={payment.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedPayment(payment)}
              >
                <td className="py-2 px-4">{payment.id}</td>
                <td className="py-2 px-4">${payment.amount}</td>
                <td className="py-2 px-4 capitalize">{payment.status}</td>
                <td className="py-2 px-4">{formatDate(payment.createdAt)}</td>
                <td className="py-2 px-4">
                  {payment.metadata[0]?.value || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentsList;
