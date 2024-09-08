
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



export default function DropDown({data, headerTitles}) {
 
    const [datas, setData] = useState(data || [])
    console.log(datas)


    return (
        <div className="card">
            <DataTable value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
              {

                headerTitles.map((title) => (
                  <Column field={title} header={title} style={{width: '25%'}} />
                ))
                
              }
            </DataTable>
        </div>
    );
}
        