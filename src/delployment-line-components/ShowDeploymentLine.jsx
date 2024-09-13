import React from 'react'
import { useOutletContext } from 'react-router-dom'
import TableDL from './TableDL'

function ShowDeploymentLine() {
  const {loading, deploymentLines} = useOutletContext()

  // console.log(deploymentLines)
  return (
    <div>
      {loading && <p>Loading...</p>}

      {
        !loading &&
        (<TableDL data={deploymentLines} />)
      }
    </div>
  )
}

export default ShowDeploymentLine
