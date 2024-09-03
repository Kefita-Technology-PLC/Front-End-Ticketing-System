
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "./ui/alert";
import { ComPie, Comp } from "./ComPie";
import axios from "axios";
import { apiEndpoint, headers } from "../data/AuthenticationData";
import Skeleton from "react-loading-skeleton";
import { CircularPie } from "./CircularPie";


export default function Dashboard() {

  const [generalReport, setGeneralReport] = useState([])
  const [loading, setLoading] = useState(false)
  const [countTypes, setCountTypes] = useState([])

  const fetchData = useCallback(
    async ()=>{
      setLoading(true)
      try{
        const generalReportData = await axios.get(`${apiEndpoint}/v1/general-report`, {headers})
        const user = await
        // console.log(generalReportData.data.data)
        setGeneralReport(generalReportData.data.data)
        setCountTypes(generalReportData.data.data.carTypesCount)
        // console.log(countTypes)
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
      }
    }
  )

  useEffect( ()=>{
    fetchData()
  },[])


  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex flex-row gap-4 w-full"></div>
        <h1 className="text-2xl p-4">Welcome to Dashboard</h1>

        <div >
          {
            loading ?
            (
              <p>Loading..</p>
            
            ) :
            (
              <div className="grid grid-cols-3 gap-x-2">

                <ComPie 
                  title={'Total Registered Vehicles'}
                  description={'Total registered cars by their type'}
                  boxTitle={'Vehicles'}
                  countTypes= {countTypes}
                  footer={'Total registered vehicles in the system.'}
                />
                <CircularPie
                  title ={'Total Registered Stations'}
                  description={'Total registerd Stations'}
                  boxTitle={'Stations'}
                  footer={'Total registered station in the system'}
                  generalReport={generalReport}
                  isStation={true}
                />

                <CircularPie 
                  title={'Total Registered Associations'}
                  description={'Total registered associations.'}
                  boxTitle={'Associations'}
                  footer={'Total registered associations in the system'}
                  generalReport={generalReport}
                  isStation={false}
                />
              </div>
            )

          }
        </div>
        


      <div className="flex flex-row gap-4 w-full"></div>
    </div>
  );
}
