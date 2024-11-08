import React, { useState, useEffect } from 'react';
import { useUser } from "../Componentes/UserContext"; // Asegúrate de que la ruta sea correcta
import Navbar from "../Componentes/NavbarInicio"; // Verifica el nombre del archivo
import BarraLateral from "../Componentes/BarraLateralAdministrador"; // Asegúrate de que la ruta y nombre sean correctos
import BarraCopyright from "../Componentes/BarraCopyright";
import '@fortawesome/fontawesome-free/css/all.min.css';


const BusquedaDocentes = () => {
  const [tabla, setTabla] = useState([]);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [docenteFilter, setDocenteFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const docentesDataPaginated = filteredData.slice(startIdx, endIdx);

  const fetchTablaAvances = async () => {
    try {
      const response = await fetch('http://localhost/ProyectoTis/Backend/busquedaEstudiante.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const text = await response.text();
      const data = JSON.parse(text);
  
      if (data?.docentes && Array.isArray(data.docentes)) {
        // Ordena la tabla por idEstudiante
        const sortedData = data.docentes.sort((a, b) => a.idDocente - b.idDocente);
        setTabla(sortedData);
        setFilteredData(sortedData); // Inicializa filteredData con los datos ordenados
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

  const applyFilters = () => {
    let filtered = tabla;
    if (docenteFilter) {
      filtered = filtered.filter((docente) =>
        `${docente.nombreDocente} ${docente.apellidoDocente}`
          .toLowerCase()
          .includes(docenteFilter.toLowerCase())
      );
    }
    setFilteredData(filtered);
    setCurrentPage(1); // Reinicia a la primera página después de aplicar el filtro
  };

  useEffect(() => {
    applyFilters();
  }, [docenteFilter, tabla]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <Navbar /> {/* Componente de navegación */}
      <div className="bg-custom-bg flex" style={{ height: '100vh', marginTop: '70px' }}>
        <BarraLateral /> {/* Componente de la barra lateral */}
        <div className="mt-8 flex-1">
          <div className="w-3/4 mx-auto">
            <h2
              className="font-semibold text-3xl"
              style={{ color: "#1E3664" }}
            >
              Tabla de Docente:
            </h2>
          </div>
          <div className="mt-4 px-4">
          <div className="relative w-3/4 mx-auto">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-search"></i> {/* Ícono de lupa de Font Awesome */}
            </span>
            <input
              type="text"
              placeholder="Buscar docente..."
              value={docenteFilter}
              onChange={(e) => setDocenteFilter(e.target.value)}
              className="px-10 py-2 border border-gray-300 rounded w-full" // Espacio extra para el ícono
            />
          </div>
          
          </div>
          {error && (
            <p className="text-red-500 mt-2 text-center">{error}</p>
          )}
          <div
            className="mx-auto w-3/4 h-72 p-4 border border-gray-300 overflow-y-auto shadow-sm mt-4"
            style={{ height: "500px", backgroundColor: "#1E3664", borderRadius: "45px" }}
          >
            <table className="w-full text-white">
              <thead>
                <tr>
                  <th className="p-2 border-b">Id</th>
                  <th className="p-2 border-b">Nombre</th>
                  <th className="p-2 border-b">Apellido</th>
                  <th className="p-2 border-b">Correo</th>
                  <th className="p-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {docentesDataPaginated.length > 0 ? (
                  docentesDataPaginated.map((Docente, index) => (
                    <tr key={index}>
                      <td className="p-2 border-b">{Docente.idDocente}</td>
                      <td className="p-2 border-b">{Docente.nombreDocente}</td>
                      <td className="p-2 border-b">{Docente.apellidoDocente}</td>
                      <td className="p-2 border-b">{Docente.correoDocente}</td>
                      <td className="p-2 border-b">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                        >
                          Ver Perfil
                        </button>
                      </td>
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

export default BusquedaDocentes;
