// src/components/PaymentsList.tsx
import React, { useEffect, useState } from "react";
import SinglePaymentView from "./SinglePaymentView";
import { getPayments } from "../services/dataService";
interface Payment {
  id: string;
  amount: number;
  status: string;
  createdAt: number;
  metadata: { key: string; value: string }[];
}

const ITEMS_PER_PAGE = 5;

const PaymentsList: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  useEffect(() => {
    getPayments().then(setPayments);
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 text-xs font-semibold rounded-full";
    if (status === "paid") return `${base} bg-green-100 text-green-700`;
    if (status === "failed") return `${base} bg-red-100 text-red-700`;
    return `${base} bg-yellow-100 text-yellow-700`;
  };

  const resetFilters = () => {
    setStatusFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
    setCurrentPage(1);
  };

  const filteredData = payments.filter((payment) => {
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

  if (selectedPayment) {
    return (
      <SinglePaymentView
        payment={selectedPayment}
        onBack={() => setSelectedPayment(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Payments</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="border rounded-lg px-3 py-2"
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
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              value={startDateFilter}
              onChange={(e) => {
                setStartDateFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              value={endDateFilter}
              onChange={(e) => {
                setEndDateFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            onClick={resetFilters}
            className="ml-auto px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {currentItems.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <p className="text-lg font-medium">No payments found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <table className="min-w-full">
                <thead className="bg-gray-100 text-left text-sm uppercase tracking-wide text-gray-600">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Reference</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((payment) => (
                    <tr
                      key={payment.id}
                      onClick={() => setSelectedPayment(payment)}
                      className="border-t hover:bg-gray-50 hover:scale-[1.01] transition cursor-pointer"
                    >
                      <td className="px-6 py-4 font-medium">{payment.id}</td>
                      <td className="px-6 py-4">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(payment.status)}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(payment.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {payment.metadata[0]?.value || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between items-center p-4 border-t">
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <div className="space-x-2">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsList;
