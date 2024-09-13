import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function DropDown({ data, headerTitles }) {
    // Function to format the "edited" column
    const editedTemplate = (rowData) => {
        return rowData.created_at === rowData.updated_at
            ? 'No'
            : <>
                <FontAwesomeIcon icon={faCheck} /> {new Date(rowData.updated_at).toLocaleDateString()}
              </>;
    };

    // Function to format the "stations" column
    const stationsTemplate = (rowData) => {
        return rowData.stations.map(station => station.name).join(', ');
    };

    // Function to format the "establishmentDate" column
    const establishmentDateTemplate = (rowData) => {
        return new Date(rowData.establishment_date).toLocaleDateString();
    };

    // Function to format the "createdAt" column
    const createdAtTemplate = (rowData) => {
        return new Date(rowData.created_at).toLocaleDateString();
    };

    return (
        <div className="card">
            <DataTable style={{ fontSize: '13px' }} value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column body={stationsTemplate} header="Stations" style={{ width: '25%' }}></Column>
                <Column body={establishmentDateTemplate} header="Establishment Date" style={{ width: '25%' }}></Column>
                <Column body={editedTemplate} header="Edited" style={{ width: '25%' }}></Column>
                <Column body={createdAtTemplate} header="Registered At" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
}
