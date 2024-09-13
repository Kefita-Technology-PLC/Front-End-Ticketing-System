import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

function TableDL({tableHeads, data}) {
  const editedTemplate = (rowData)=>{
    return rowData.created_at === rowData.updated_at
      ? 'No'
      : <>
          <FontAwesomeIcon icon={faCheck} />
          {new Date(rowData.updated_at).toLocaleDateString()}
        </>
  }

    // Function to format the "createdAt" column
    const createdAtTemplate = (rowData) => {
        return new Date(rowData.created_at).toLocaleDateString();
    };
    console.log(data)

  return (
    <div className='card'>
      <DataTable style={{fontSize: '13px'}} value={data} paginator rows={5} rowsPerPageOptions={[5,19,25,50]}>
        <Column field="origin" header="Origin" style={{ width: '25%' }}></Column>
        <Column field="destination" header="Destination" style={{ width: '25%' }}></Column>
        <Column body={editedTemplate} header="Edited" style={{ width: '25%' }}></Column>
        <Column body={createdAtTemplate} header="Registered At" style={{ width: '25%' }}></Column>
      </DataTable>
    </div>
  )
}

export default TableDL
