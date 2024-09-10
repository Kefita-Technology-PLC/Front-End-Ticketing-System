import React, { useState, useEffect, useCallback } from "react";
import { apiEndpoint, headers } from "../data/AuthenticationData";
import { Outlet } from "react-router-dom";
import axios from "axios";
import TopHeaders from "../headers/TopHeaders";
import { associationNavigation } from "../data/AssociationData";
import { useEthiopianGregorian } from "../contexts/LanguageContext";

export const Association = () => {

  const {isEthiopianOrGregorian} = useEthiopianGregorian()

  const [associations, setAssociations] = useState([])
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(false)

  const fetchData = useCallback(async()=>{
    setLoading(true)
    try{
      const [associationData] = await Promise.all([
        axios.get(`${apiEndpoint}/v1/associations-all`, {headers})
      ])
      setAssociations(associationData.data.data)
    }catch(error){
      setErrors({general: "Faild to fetch data"})
      console.error("Error fetching data:", error)
    }finally{
      setLoading(false)
    }
  })

  useEffect(()=>{
    fetchData()
  }, [refreshFlag,isEthiopianOrGregorian])

  const handleRefresh = () =>{
    setRefreshFlag((prev) => !prev)
  }

  return (
    <div className="p-2 pt-6 md:pt-2 ">
      <div className="relative">

        <TopHeaders
          topTitle={'Associations'}
          navigation={associationNavigation}
          mainUrl={'Association'}
          firstButton={'Add'}
          seccondButton={'Delete or update'}
        />

      </div>

      <Outlet 
        context={{
          associations,
          handleRefresh,
          loading,
          setAssociations
        }}
      >
      </Outlet>
    </div>
  );
};
