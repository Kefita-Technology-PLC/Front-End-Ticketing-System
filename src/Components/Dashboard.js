
import React, { useCallback, useEffect, useState } from "react";
import {useTranslation} from 'react-i18next'
import { ComPie } from "./ComPie";
import axios from "axios";
import { apiEndpoint, headers } from "../data/AuthenticationData";
import { CircularPie } from "./CircularPie";
import LanguageSelector from "./shared/LanguageSelector";


export default function Dashboard() {
  const {t}= useTranslation()
  const [generalReport, setGeneralReport] = useState([])
  const [loading, setLoading] = useState(false)
  const [countTypes, setCountTypes] = useState([])
  const [user, setUser] = useState([])

  const fetchData = useCallback(
    async ()=>{
      setLoading(true)
      console.log('habesha')
      try{
        const generalReportData = await axios.get(`${apiEndpoint}/v1/general-report`, {headers})
        const userData = await axios.get(`${apiEndpoint}/user`, {headers})
        setGeneralReport(generalReportData.data.data)
        setCountTypes(generalReportData.data.data.carTypesCount)
        setUser(userData.data)
        console.log(generalReport)
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

  const languages = [
    {code: 'en', name: "English", id:1},
    {code: "amh", name: "Amharic", id:2},
    {code: "oro", name: "Oromifa", id:3},
  ]


  return (
    <section className="mx-auto p-4">

      <div className=" flex  justify-between items-center">
        <div>
          <h1 className="text-2xl p-4 font-ubuntu">{t("greeting")} ✋🏾, <span className="text-xl">{user.name}</span></h1>

        </div>
        <LanguageSelector/>
      </div>

        <div >
          {
            loading ?
            (
              <p>Loading..</p>
            
            ) :
            (
            <div className="grid md:grid-cols-3 p-2 gap-y-2 gap-x-2 grid-cols-1 sm:grid-cols-2">

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
                  isAssosiation={true}
                />

                <CircularPie 
                  title={'Total Registerd Deployment Lines'}
                  description={'Total registerd deployment lines.'}
                  boxTitle={'Deployment Lines'}
                  footer={'Total registered deployment lines in the system.'}
                  generalReport={generalReport}
                  isDeployement={true}
                />

                <CircularPie 
                  title={'Total Admins Number'}
                  description={'Total registered admins.'}
                  boxTitle={'Admins'}
                  footer={'Total registered admins  in the system.'}
                  generalReport={generalReport}
                  isAdmins={true}
                />

                <CircularPie 
                  title={'Total Ticket Sellers'}
                  description={'Total registerd ticket sellers.'}
                  boxTitle={'Tikect sellers'}
                  footer={'Total registered ticket sellers in the system.'}
                  generalReport={generalReport}
                  isTicketSellers={true}
                />
              </div>
            )

          }
        </div>
        
    </section>
  );
}
