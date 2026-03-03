import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function TopBar() {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center px-4 py-2 text-white rounded-lg shadow-sm transition"
          style={{ background: "linear-gradient(to right, #14b8a6, #0ea5e9)" }} // اللون الافتراضي
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(-135deg, rgb(170, 181, 234) 0%, rgb(65, 215, 189) 100%)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(to right, #14b8a6, #0ea5e9)")
          }
        >
          <UserCircleIcon className="w-5 h-5 mr-2" />
          Profile
        </button>
      </div>
    </header>
  );
}
