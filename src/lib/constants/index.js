import {
  HiOutlineViewGrid,
  HiOutlineOfficeBuilding,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiOutlineTruck,
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineTicket,
  HiOutlineChartBar,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "Vehicle",
    label: "Vehicle",
    path: "/Vehicle",
    icon: <HiOutlineTruck />,
  },
  {
    key: "Association",
    label: "Association",
    path: "/Association",
    icon: <HiOutlineOfficeBuilding />,
  },
  {
    key: "Destination",
    label: "Deployment Lines",
    path: "/deployment-lines",
    icon: <HiOutlineLocationMarker />,
  },

  {
    key: "Tarif",
    label: "Tarif",
    path: "/Tarif",
    icon: <HiOutlineCurrencyDollar />,
  },
  {
    key: "employee",
    label: "Employee",
    path: "/Employee",
    icon: <HiOutlineUserGroup />,
  },
  {
    key: "TicketReport",
    label: "TicketReport",
    path: "/TicketReport",
    icon: <HiOutlineTicket />,
  },
  {
    key: "TotalReport",
    label: "TotalReport",
    path: "/TotalReport",
    icon: <HiOutlineChartBar />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
