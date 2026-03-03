import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import AnalyticsDashboard from "./components/Dashboard";
import PaymentsList from "./components/PaymentsList";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 flex flex-col transition-all duration-300">
          <TopBar />

          <main className="flex-1 overflow-auto p-6">
            <Routes>
              <Route path="/" element={<AnalyticsDashboard />} />
              <Route path="/payments" element={<PaymentsList />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
