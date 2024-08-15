import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export const Layout = () => {
  return (
    <div className="flex flex-row h-screen bg-custom-blue">
      {/* Sidebar */}
      <div className="w-64 h-full fixed top-0 left-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
