
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRightLong } from '@fortawesome/free-solid-svg-icons';



export default function DropDown({data, headerTitles}) {
 


    const transformedAssociations = data.map((association) => ({
      name: association.name,
      stations: association.stations.map(station => station.name).join(', '),
      establishmentDate:new Date(association.establishment_date).toLocaleDateString(),
      edited: association.created_at === association.updated_at ? 'No' : <><FontAwesomeIcon icon={faCheck} /> {new Date(association.updated_at).toLocaleDateString()}</> ,
      createdAt : new  Date(association.created_at).toLocaleDateString()
    }))

    console.log(transformedAssociations)
    return (
        <div className="card">
            <DataTable style={{fontSize: '13px'}} value={transformedAssociations} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>

                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="stations" header="Stations" style={{ width: '25%' }}></Column>
                <Column field="establishmentDate" header="Establishment Date" style={{ width: '25%' }}></Column>
                <Column field="edited" header="Edited" style={{ width: '25%' }}></Column>

                <Column field="createdAt" header="Registered At" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
}
        