export const kpiData = {
  totalPayments: 120,
  totalAmount: 45000,
  averageAmount: 375,
};

export const paymentsData = [
  {
    id: "ch_1",
    amount: 100,
    status: "paid",
    createdAt: 1675200000,
    metadata: [{ key: "order", value: "A001" }],
  },
  {
    id: "ch_2",
    amount: 250,
    status: "failed",
    createdAt: 1675203600,
    metadata: [{ key: "order", value: "A002" }],
  },
  {
    id: "ch_3",
    amount: 75,
    status: "paid",
    createdAt: 1675207200,
    metadata: [{ key: "order", value: "A003" }],
  },
];
