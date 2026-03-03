import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  CreditCardIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Logo from "../logo.svg";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  const sidebarItems = [
    { name: "Dashboard", path: "/", icon: <HomeIcon /> },
    { name: "Payments", path: "/payments", icon: <CreditCardIcon /> },
  ];

  return (
    <aside
      className={`flex flex-col bg-white shadow-lg transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-6">
        {sidebarOpen && (
          <div className="flex items-center justify-center p-4">
            <img
              src={Logo}
              alt="Logo"
              className="w-full h-auto object-contain"
            />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-100 transition"
        >
          {sidebarOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1">
        {sidebarItems.map((item) => (
          <div key={item.name} className="relative group">
            <Link
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-400 hover:to-teal-600 rounded-lg mb-1 transition ${
                sidebarOpen ? "" : "justify-center"
              }`}
            >
              {React.cloneElement(item.icon, {
                className: `${sidebarOpen ? "w-5 h-5 mr-2" : "w-6 h-6"} text-gray-700`,
              })}
              {sidebarOpen && <span>{item.name}</span>}
            </Link>

            {/* Tooltip */}
            {!sidebarOpen && (
              <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
