import Navbar from "../Componentes/NavbarInicio"; 
import BarraLateral from "../Componentes/BarraLateralAdministrador"; 
import BarraCopyright from "../Componentes/BarraCopyright";
import React, { useState, useEffect } from 'react';

const Bitacoras = () => {
  const [tabla, setTabla] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const estudiantesDataPaginated = filteredData.slice(startIdx, endIdx);
   const fetchTablaAvances = async () => {
       try {
         const response = await fetch('http://innovalogic.tis.cs.umss.edu.bo/Bitacora.php', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
         });
     
         const text = await response.text();
         const data = JSON.parse(text);
     
         if (data?.bitacora && Array.isArray(data.bitacora)) {
           const sortedData = data.bitacora.sort((a, b) => a.idBitacora - b.idBitacora);
           setTabla(sortedData);
           setFilteredData(sortedData);
         } else {
           setTabla([]);
           setError("No se encontraron datos en la tabla.");
         }
       } catch (error) {
         console.error('Error al obtener los datos:', error);
         setError('Hubo un problema al cargar los datos.');
       }
     };
     
   
     useEffect(() => {
       fetchTablaAvances();
     }, []);
     useEffect(() => {
      console.log("Datos en filteredData:", filteredData);
    }, [filteredData]);
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
  

  return (
    <>
      <Navbar />
      <div className="bg-custom-bg flex" style={{ height: 'calc(-110px + 100vh)', marginTop: '70px' }}>
        <BarraLateral />
        <div className="mt-8 flex-1" style={{  overflowY: 'auto'  }}>
        <div className="w-3/4 mx-auto">
          <h2 className="font-semibold text-3xl" style={{ color: "#1E3664" }}>
              BITACORA
            </h2>
            </div>
            <div
            className="mx-auto w-3/4 h-72 p-4 border border-gray-300 overflow-y-auto shadow-sm mt-4"
            style={{ height: "500px", backgroundColor: "#1E3664", borderRadius: "45px" }}
          >
            <table className="w-full text-gray-200">
            <thead>
                <tr>
                  <th className="p-2 border-b">idUsuario</th>
                  <th className="p-2 border-b">Usuario</th>
                  <th className="p-2 border-b">Mensaje</th>
                  <th className="p-2 border-b">Fecha</th>
                </tr>
              </thead>
              <tbody>
              {estudiantesDataPaginated.length > 0 ? (
                  estudiantesDataPaginated.map((bitacora, index) => (
                    <tr key={index} style={{ color: "white", border: "1px solid white" }}>
                                          <td className="p-2 border-b">{bitacora.idUsuario}</td>
                                          <td className="p-2 border-b">{bitacora.Usuario}</td>
                                          <td className="p-2 border-b">{bitacora.Mensaje}</td>
                                          <td className="p-2 border-b">{bitacora.Fecha}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="5" className="p-2 border-b text-center">
                                          No hay datos disponibles
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>

            </table>
            </div>

        
        <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 rounded ${
                  page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
      <BarraCopyright />
    </>
  );
}

export default Bitacoras;
