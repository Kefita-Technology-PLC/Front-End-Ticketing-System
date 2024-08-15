
import React from "react";
import { Alert } from "./ui/alert";
import { Comp } from "./Comp";


export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 w-full"></div>
        <h1>Welcome to Dashboard</h1>
      <Comp />

      <div className="flex flex-row gap-4 w-full"></div>
    </div>
  );
}
