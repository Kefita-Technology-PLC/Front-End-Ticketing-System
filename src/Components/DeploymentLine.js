import { apiEndpoint, headers } from '../data/AuthenticationData'
import { dLNavigation } from '../data/DeploymentLineData'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopHeaders from '../headers/TopHeaders'
import { useEthiopianGregorian } from '../contexts/LanguageContext'

function DeploymentLine() {
  const [loading, setLoading] = useState(false)
  const [deploymentLines, setDeploymentLines] = useState([])
  const [errors, setErrors] = useState([])
  const [refreshFlag, setRefreshFlag] = useState(false)
  const {isEthiopianOrGregorian} = useEthiopianGregorian()

  const fetchData = useCallback(async()=>{
    setLoading(true)
    try{
      const [deploymentLineData] = await Promise.all([
        axios.get(`${apiEndpoint}/v1/deployment-lines`, {headers})
      ])
      setDeploymentLines(deploymentLineData.data.data)
    }catch(error){
      setErrors({general: "Faild to fetch data"})
      console.error("Error fetching data:", error)
    }finally{
      setLoading(false)
    }
  })

  
  useEffect(()=>{
    fetchData()
  }, [refreshFlag, isEthiopianOrGregorian])

  const handleRefresh = ()=>{
    setRefreshFlag((prev)=> !prev)
  }

  return (
    <div className='p-2 pt-6 md:pt-2'>
      <div className='relative'>

        <TopHeaders 
          topTitle={'Deployment Lines'}
          navigation={dLNavigation}
          mainUrl={'deployment-lines'}
        />
      </div>

      <Outlet 
        context={{
          deploymentLines,
          handleRefresh,
          loading,
          setDeploymentLines,
        }}
      />
      
    </div>
  )
}

export default DeploymentLine

