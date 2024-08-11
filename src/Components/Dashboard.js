
import React from "react";
import { Alert } from "./ui/alert";
import { ChartBar } from "lucide-react";
import { Comp } from "./Comp";

// import BuyerProfilePieChart from "./BuyerProfilePieChart";
// import PopularProducts from "./PopularProducts";
// import RecentOrders from "./RecentOrders";
// import DashboardStats from "./DashboardStats";
// import TransactionChart from "./TransactionChart";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 w-full"></div>
        <h1>Welcome to Dashboard</h1>
      <Alert />
      <Comp />
      <div className="flex flex-row gap-4 w-full"></div>
    </div>
  );
}
