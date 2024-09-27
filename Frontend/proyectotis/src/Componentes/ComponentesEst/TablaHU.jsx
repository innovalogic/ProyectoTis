import React from 'react';
import DataTable from 'react-data-table-component';
import { RiDeleteBin6Fill } from "react-icons/ri";
import './EstilosComponentes.scss'; 
const customStyles = {
    rows: {
      style: {
        minHeight: '45px', // Altura mínima de las filas
        backgroundColor: '#7ea1d3', // Color de fondo de las filas
        '&:nth-of-type(even)': {
          backgroundColor: '##7ea1d3', // Color de fondo de filas pares
        },
      },
      textAlign: 'center',
    },
    headCells: {
      style: {
        backgroundColor: '#1E3664', // Color de fondo del encabezado
        color: '#EFE7DC', // Color del texto del encabezado
        fontWeight: 'bold', // Negrita en el encabezado
        padding: '10px',
        fontSize: '20px',
        textAlign: 'center',

      },
    },
    cells: {
      style: {
        padding: '10px',
        color: '#1E3664', // Color del texto de las celdas
        fontSize: '18px', // Aumentar el tamaño del texto de las celdas
      fontWeight: '600',
      },
    },
  };
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
          <button onClick={() => onDelete(row.id)} style={{background:'none', border:'none', cursor:'pointer', display:'flex'}}>
            <RiDeleteBin6Fill />
            Eliminar</button>
        ),
        center: true,
      },
    ];
  
    return (
      <DataTable
        columns={columns}
        data={data}
        highlightOnHover
        customStyles={customStyles}
        className='tabla'
      />
    );
};

export default TablaHU;