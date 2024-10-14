import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralEstudiante from '../Componentes/BarraLateralEstudiante';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function RecuperarEvaluacionMiembro() {
    const [estudiantesData, setEstudiantesData] = useState([]); 
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    const [grupoFilter, setGrupoFilter] = useState('');
    const [estudianteFilter, setEstudianteFilter] = useState('');
    const [fechaInicioFilter, setFechaInicioFilter] = useState('');
    const [fechaFinFilter, setFechaFinFilter] = useState('');
    const [calificacionFilter, setCalificacionFilter] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');

    const location = useLocation();
    const { mensaje } = location.state || {};
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25; // Puedes ajustar cuántos elementos mostrar por página

    // Calcular los datos filtrados para la página actual
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const estudiantesDataPaginated = filteredData.slice(startIdx, endIdx);

    const handlePageChange = (pageNumber, event) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const response = await axios.get('http://localhost/proyectotis/backend/CargarEvaluaciones.php');
                if (response.data.success === true) {
                    setEstudiantesData(response.data.datos);
                    setFilteredData(response.data.datos); 
                } else {
                    setError('No se pudo obtener los datos.');
                }
            } catch (error) {
                setError('Error al conectarse al servidor: ' + error.message);
            }
        };
    
        fetchEstudiantes();
    }, []);

    const applyFilters = () => {
        let filtered = estudiantesData;

        if (grupoFilter) {
            filtered = filtered.filter(estudiante => estudiante.grupo === grupoFilter);
        }

        if (estudianteFilter) {
            filtered = filtered.filter(estudiante => 
                `${estudiante.nombreEstudiante} ${estudiante.apellidoEstudiante}`.toLowerCase().includes(estudianteFilter.toLowerCase())
            );
        }

        if (fechaInicioFilter) {
            filtered = filtered.filter(estudiante => new Date(estudiante.fechaEvaluacion) >= new Date(fechaInicioFilter));
        }

        if (fechaFinFilter) {
            filtered = filtered.filter(estudiante => new Date(estudiante.fechaEvaluacion) <= new Date(fechaFinFilter));
        }

        if (calificacionFilter) {
            if (calificacionFilter === "Cualitativa") {
                filtered = filtered.filter(estudiante => isNaN(estudiante.calificacion));
            } else if (calificacionFilter === "Cuantitativa") {
                filtered = filtered.filter(estudiante => !isNaN(estudiante.calificacion));
            }
        }

        if (estadoFilter) {
            filtered = filtered.filter(estudiante => estudiante.estado === estadoFilter);
        }

        setFilteredData(filtered);
        setCurrentPage(1); // Resetear a la primera página cuando se aplican filtros
    };

    useEffect(() => {
        applyFilters();
    }, [grupoFilter, estudianteFilter, fechaInicioFilter, fechaFinFilter, calificacionFilter, estadoFilter]);

    const gruposUnicos = [...new Set(estudiantesData.map(estudiante => estudiante.grupo))];

    const totalPages = Math.ceil(filteredData.length / itemsPerPage); // Total de páginas

    return (
        <>
            <NavbarInicioDeSesion />
            <div style={{ display: 'flex', height: '100%', marginTop: '70px', backgroundColor: '#32569A' }}>
                <BarraLateralEstudiante/>
                <form className={`space-y-4 p-4 flex-1 bg-[#efe7dc] rounded-md`}>
                    <h1 className="text-2xl font-bold text-[#32569A] text-center mb-4">Recuperar Evaluaciones Scrum</h1>

                    <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                        <select 
                            value={calificacionFilter} 
                            onChange={e => setCalificacionFilter(e.target.value)}
                            className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded"
                        >
                            <option value="">Calificación</option>
                            <option value="Cualitativa">Cualitativa</option>
                            <option value="Cuantitativa">Cuantitativa</option>
                        </select>

                        <select 
                            value={estadoFilter} 
                            onChange={e => setEstadoFilter(e.target.value)}
                            className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded"
                        >
                            <option value="">Estado</option>
                            <option value="Revisada">Revisada</option>
                            <option value="Sin Entregar">Sin Entregar</option>
                        </select>

                        <input 
                            type="date" 
                            value={fechaInicioFilter} 
                            onChange={e => setFechaInicioFilter(e.target.value)}
                            className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded"
                        />

                        <input 
                            type="date" 
                            value={fechaFinFilter} 
                            onChange={e => setFechaFinFilter(e.target.value)}
                            className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded"
                        />
                    </div>

                    <div className="bg-[#e1d7b7] border border-[#32569A] rounded-lg p-4">
                        <table className="min-w-full bg-[#e1d7b7] border-collapse rounded-lg">
                            <thead>
                                <tr className="bg-[#e1d7b7] text-black">
                                    <th className="py-2 px-4 border border-solid border-black">Fecha</th>
                                    <th className="py-2 px-4 border border-solid border-black">Estudiante</th>
                                    <th className="py-2 px-4 border border-solid border-black">Grupo</th>
                                    <th className="py-2 px-4 border border-solid border-black">Actividad</th> 
                                    <th className="py-2 px-4 border border-solid border-black">Calificación</th> 
                                    <th className="py-2 px-4 border border-solid border-black">Detalle</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {estudiantesDataPaginated.map((estudiante) => (
                                    <tr key={estudiante.idEvaluacion}>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.fechaEvaluacion}
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.nombreEstudiante}
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.nombreGrupo}
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.Actividad}
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.Calificacion}
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.Detalle}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-center w-full mt-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button 
                            key={page} 
                            onClick={(e) => {
                                e.preventDefault(); // Evitar recarga
                                handlePageChange(page);
                            }} 
                            className={`py-2 px-4 ${page === currentPage ? 'bg-[#32569A] text-white' : 'bg-[#e1d7b7] text-black'} rounded mx-1`}
                        >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                </form>
            </div>

            <Copyright />
        </>
    );
}
