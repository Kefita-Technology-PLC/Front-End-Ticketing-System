
import Dropdown from '../Components/shared/DropDown';
import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { associationTableTitles } from '../data/AssociationData';

function ShowAssociations() {
  const {loading, associations} = useOutletContext();
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && 
      <Dropdown 
        data={associations}
        headerTitles={associationTableTitles}
      />}
    </div>
  )
}

export default ShowAssociations
