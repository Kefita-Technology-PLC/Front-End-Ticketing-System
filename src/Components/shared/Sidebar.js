import React, { useRef, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/constants";
import { IoMdBus } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHamburger, faX } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "../Dashboard";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const navigationMenu = useRef(null)
  const [isNavToggled, setIsNavToggled] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token')
    // Clear the Axios default authorization header
    delete axios.defaults.headers.common['Authorization'];

    // Redirect to the login page or home page
    navigate('/login');
  };

  const toggle = ()=>{
    navigationMenu.current.classList.toggle('hidden')
    console.log('error')
    setIsNavToggled(!isNavToggled)
  }
  return (

    <div>
      <FontAwesomeIcon icon={isNavToggled ? faX: faBars} className={`fixed top-5 left-5 text-2xl md:hidden ${isNavToggled ?'' : ''} z-[10] bg-white outline-1 outline px-2 p-1 rounded-md`} onClick={toggle} />

      <div className="bg-neutral-900    p-3 md:flex flex-col w-64 h-screen fixed md:top-0 md:left-0 top-0 hidden md:pt-0 pt-6" ref={navigationMenu}>
        <div className="flex items-center gap-2 px-1 py-3">
          <IoMdBus fontSize={24} className="bg-white " />
          <span className="text-neutral-200 text-lg">Transport App</span>
        </div>

        <div className="md:py-8 py-4 flex flex-1 flex-col gap-0.5">
          {DASHBOARD_SIDEBAR_LINKS.map((link, index) => (
            <SidebarLink key={link.key} link={link} index={index} />
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
    </div>

  );
}

function SidebarLink({ link, index }) {
  const { pathname } = useLocation();
  // console.log(pathname, link.path)
  let isDashboard = false

  if (pathname == '/'){
    isDashboard = true
    console.log('all this time')
  }

  return (
    <>
      {
        !isDashboard &&
          <Link
          to={link.path}
          className={classNames(
            pathname.includes(link.path)
              ? "bg-neutral-700 text-white"
              : "text-neutral-400", isDashboard ? '' : '',
            linkClass
            )}
          >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    
      }
      {
        isDashboard &&(
          <Link
          to={link.path}
          className={classNames(
            pathname.endsWith(link.path) && pathname === '/'
              ? "bg-neutral-700 text-white"
              : "text-neutral-400", isDashboard ? '' : '',
            linkClass
          )}
        >
          <span className="text-xl">{link.icon}</span>
          {link.label}
        </Link>
        )
      }
    </>


  );
}
