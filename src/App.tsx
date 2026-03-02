import React from "react";
import Dashboard from "./components/Dashboard";
import PaymentsList from "./components/PaymentsList";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Dashboard />
      <PaymentsList />
    </div>
  );
}

export default App;
