import React, { useState, useEffect } from 'react';
import Navbar from "../Componentes/NavbarInicio";
import BarraLateral from "../Componentes/BarraLateralAdministrador";
import BarraCopyright from "../Componentes/BarraCopyright";
import '@fortawesome/fontawesome-free/css/all.min.css';

const BusquedaEstudiantes = () => {
  const [tabla, setTabla] = useState([]);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [estudianteFilter, setEstudianteFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const estudiantesDataPaginated = filteredData.slice(startIdx, endIdx);

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
  
      if (data?.estudiantes && Array.isArray(data.estudiantes)) {
        // Ordena la tabla por idEstudiante
        const sortedData = data.estudiantes.sort((a, b) => a.idEstudiante - b.idEstudiante);
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
    if (estudianteFilter) {
      filtered = filtered.filter((estudiante) =>
        `${estudiante.nombreEstudiante} ${estudiante.apellidoEstudiante}`
          .toLowerCase()
          .includes(estudianteFilter.toLowerCase())
      );
    }
    setFilteredData(filtered);
    setCurrentPage(1); // Reinicia a la primera página después de aplicar el filtro
  };

  useEffect(() => {
    applyFilters();
  }, [estudianteFilter, tabla]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="bg-custom-bg flex" style={{ height: '100vh', marginTop: '70px' }}>
        <BarraLateral />
        <div className="mt-8 flex-1">
          <div className="w-3/4 mx-auto">
            <h2 className="font-semibold text-3xl" style={{ color: "#1E3664" }}>
              Tabla de Estudiantes:
            </h2>
          </div>
          <div className="mt-4 px-4">
            <div className="relative w-3/4 mx-auto">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Buscar estudiante..."
                value={estudianteFilter}
                onChange={(e) => setEstudianteFilter(e.target.value)}
                className="px-10 py-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 mt-2">{error}</p>
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
                  <th className="p-2 border-b">Codigo Sis</th>
                  <th className="p-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantesDataPaginated.length > 0 ? (
                  estudiantesDataPaginated.map((estudiante, index) => (
                    <tr key={index}>
                      <td className="p-2 border-b">{estudiante.idEstudiante}</td>
                      <td className="p-2 border-b">{estudiante.nombreEstudiante}</td>
                      <td className="p-2 border-b">{estudiante.apellidoEstudiante}</td>
                      <td className="p-2 border-b">{estudiante.codSis}</td>
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
};

export default BusquedaEstudiantes;
