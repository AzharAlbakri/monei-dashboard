// src/components/AnalyticsDashboard.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

// Mock data
const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4780 },
  { month: "May", revenue: 5890 },
  { month: "Jun", revenue: 6390 },
];

const paymentsData = [
  { day: "Mon", payments: 24 },
  { day: "Tue", payments: 18 },
  { day: "Wed", payments: 32 },
  { day: "Thu", payments: 27 },
  { day: "Fri", payments: 35 },
  { day: "Sat", payments: 20 },
  { day: "Sun", payments: 15 },
];

export default function AnalyticsDashboard() {
  const kpis = [
    {
      title: "Total Revenue",
      value: "$28,060",
      color: "from-teal-400 to-teal-600",
      icon: <CurrencyDollarIcon className="w-6 h-6 mb-2" />,
    },
    {
      title: "Total Payments",
      value: "171",
      color: "from-purple-400 to-purple-600",
      icon: <DocumentTextIcon className="w-6 h-6 mb-2" />,
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      color: "from-blue-400 to-blue-600",
      icon: <ArrowUpIcon className="w-6 h-6 mb-2" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {kpis.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className={`rounded-2xl shadow-lg p-6 bg-gradient-to-r ${item.color} text-white`}
            >
              {item.icon}
              <p className="text-sm">{item.title}</p>
              <p className="text-2xl font-bold mt-2">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#00c1b1"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payments Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Weekly Payments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="payments" radius={[8, 8, 0, 0]} fill="#00c1b1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
