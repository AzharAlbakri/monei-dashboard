import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function TopBar() {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
      <div className="flex items-center space-x-4">
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg shadow-sm hover:opacity-90 transition">
          <UserCircleIcon className="w-5 h-5 mr-2" />
          Profile
        </button>
      </div>
    </header>
  );
}
