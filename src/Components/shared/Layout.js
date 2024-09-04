import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


export const Layout = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="md:w-64 h-full fixed md:top-0 md:left-0 z-[200]">
        <Sidebar />
      </div>

      {/* Main Content */}
      
        <div className="md:ml-64">
          <Outlet  />
        </div>
      
    </>
  );
};
