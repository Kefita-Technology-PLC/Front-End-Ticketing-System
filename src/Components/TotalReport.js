import HeaderNavigation from "../total-report-subcomponents/HeaderNavigation";
import { apiEndpoint } from "../data/AuthenticationData";
import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { totalReportNavigation } from "../data/VehicleData";
import { Outlet } from "react-router-dom";
import axios from "axios";

export const TotalReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generalReport, setGeneralReport] = useState([])
  const [monthlyReport, setMonthlyReport] = useState([])
  const [yearlyReport, setYearlyReport] = useState([])
  const [weeklyReport, setWeeklyReport] = useState([])

  const headers = useMemo(() => {
    const token = localStorage.getItem("token");
    return {  Authorization: `Bearer ${token}` };
  }, []);

  const fetchData = async ()=>{
    setLoading(true)
    try{
      const [reportData, monthlyData, weeklyData, yearlyData] = await Promise.all([
        axios.get(`${apiEndpoint}/v1/general-report`, {headers}),
        axios.get(`${apiEndpoint}/v1/monthly-report`, {headers}),
        axios.get(`${apiEndpoint}/v1/weekly-report`, {headers}),
        axios.get(`${apiEndpoint}/v1/yearly-report`, {headers}),
      ])
      setGeneralReport(reportData.data.data)
      setWeeklyReport(weeklyData.data.data)
      setMonthlyReport(monthlyData.data.data)
      setYearlyReport((yearlyData.data.data))

      console.log(reportData.data.data)
      console.log(weeklyData.data.data)
      console.log(monthlyData.data.data)
      console.log(yearlyData.data.data)
    }catch(error){
      console.error('Error fetching general report data:', error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])



  return (
    <div>
      <div className="relative">
        <HeaderNavigation navigation={totalReportNavigation} topTitle={"Reports"}  />
      </div>

      <Outlet />
    </div>
  );
};
