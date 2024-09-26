import React from 'react';
import DataTable from 'react-data-table-component';
import './EstilosComponentes.scss'; 

const TablaHU = ({ data, onDelete }) => {
    const columns = [
      {
        name: 'HU',
        selector: (row) => row.hu,
        sortable: true,
      },
      {
        name: 'Responsable',
        selector: (row) => row.responsable,
        sortable: true,
      },
      {
        name: 'Fecha',
        selector: (row) => row.fecha,
        sortable: true,
      },
      {
        name: 'Acciones',
        cell: (row) => (
          <button onClick={() => onDelete(row.id)}>Eliminar</button>
        ),
      },
    ];
  
    return (
      <DataTable
        columns={columns}
        data={data}
        highlightOnHover
        className='tabla'
      />
    );
};

export default TablaHU;