import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
export const Layout = () => {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden ">
      <Sidebar />
      <div className="flex-1">
        <div className="p-4">{<Outlet />}</div>
      </div>
    </div>
  );
};
