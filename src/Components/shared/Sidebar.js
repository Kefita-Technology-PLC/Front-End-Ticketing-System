import React from "react";
import axios from "axios";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/constants";
import { IoMdBus } from "react-icons/io";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Clear the Axios default authorization header
    delete axios.defaults.headers.common['Authorization'];

    // Redirect to the login page or home page
    navigate('/login');
  };
  return (
    <div className="bg-neutral-900  p-3 flex flex-col w-64 h-screen fixed top-0 left-0">
      <div className="flex items-center gap-2 px-1 py-3">
        <IoMdBus fontSize={24} className="bg-white " />
        <span className="text-neutral-200 text-lg">Transport App</span>
      </div>
      <div className="py-8 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div className={classNames(linkClass, "cursor-pointer text-red-500")}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          <button onClick={handleLogout}>
              Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClass
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
