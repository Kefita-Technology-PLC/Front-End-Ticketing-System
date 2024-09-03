
import React, { useCallback, useEffect, useState } from "react";
import { ComPie } from "./ComPie";
import axios from "axios";
import { apiEndpoint, headers } from "../data/AuthenticationData";
import { CircularPie } from "./CircularPie";


export default function Dashboard() {

  const [generalReport, setGeneralReport] = useState([])
  const [loading, setLoading] = useState(false)
  const [countTypes, setCountTypes] = useState([])
  const [user, setUser] = useState([])

  const fetchData = useCallback(
    async ()=>{
      setLoading(true)
      // console.log('habesha')
      try{
        const generalReportData = await axios.get(`${apiEndpoint}/v1/general-report`, {headers})
        const userData = await axios.get(`${apiEndpoint}/user`, {headers})
        setGeneralReport(generalReportData.data.data)
        setCountTypes(generalReportData.data.data.carTypesCount)
        setUser(userData.data)
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
        <h1 className="text-2xl p-4">Welcome ✋🏾, {user.name}</h1>

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
