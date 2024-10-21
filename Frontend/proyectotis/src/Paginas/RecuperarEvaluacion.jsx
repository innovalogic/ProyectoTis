import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecuperarEvaluacion() {
    const [estudiantesData, setEstudiantesData] = useState([]); 
    const [error, setError] = useState(null);

    const [filteredData, setFilteredData] = useState([]);
    const [grupoFilter, setGrupoFilter] = useState('');
    const [estudianteFilter, setEstudianteFilter] = useState('');
    const [fechaInicioFilter, setFechaInicioFilter] = useState('');
    const [calificacionFilter, setCalificacionFilter] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25; 

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage; 
    const estudiantesDataPaginated = filteredData.slice(startIdx, endIdx);

    const handlePageChange = (pageNumber, event) => {
        event.preventDefault();
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
    
        if (estudianteFilter) {
            filtered = filtered.filter(estudiante => 
                `${estudiante.nombreEstudiante} ${estudiante.apellidoEstudiante}`.toLowerCase().includes(estudianteFilter.toLowerCase())
            );
        }
    
        if (fechaInicioFilter) {
            filtered = filtered.filter(estudiante => {
                const fechaEvaluacion = new Date(estudiante.fechaEvaluacion).toDateString();
                const fechaSeleccionada = new Date(fechaInicioFilter).toDateString();
                return fechaEvaluacion === fechaSeleccionada;
            });
        }
    
        if (calificacionFilter) {
            filtered = filtered.filter(estudiante => {
                const calificacion = parseFloat(estudiante.Calificacion);
                if (calificacionFilter === "menor_51") {
                    return calificacion < 51;
                } else if (calificacionFilter === "mayor_51") {
                    return calificacion > 51 && calificacion <= 80;
                } else if (calificacionFilter === "mayor_80") {
                    return calificacion > 80;
                }
                return true;
            });
        }
    
        if (estadoFilter) {
            if (estadoFilter === "Sin Entregar") {
                filtered = filtered.filter(estudiante => estudiante.Calificacion === "Sin Entregar"); 
            } else if (estadoFilter === "Entregada") {
                filtered = filtered.filter(estudiante => !isNaN(estudiante.Calificacion)); 
            }
        }
    
        setFilteredData(filtered);
        setCurrentPage(1);  
    };

    useEffect(() => {
        applyFilters();
    }, [grupoFilter, estudianteFilter, fechaInicioFilter, calificacionFilter, estadoFilter]);

    const gruposUnicos = [...new Set(estudiantesData.map(estudiante => estudiante.grupo))];

    const totalPages = Math.ceil(filteredData.length / itemsPerPage); // Total de páginas

    return (
        <>
            <NavbarInicioDeSesion />
            <div style={{ display: 'flex', height: '100%', marginTop: '70px', backgroundColor: '#32569A' }}>
                <BarraLateralDocente/>
                <form className={`space-y-4 p-4 flex-1 bg-[#efe7dc] rounded-md`}>
                    <h1 className="text-2xl font-bold text-[#32569A] text-center mb-4">Recuperar Evaluaciones</h1>

                    <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                        <input 
                            type="text" 
                            placeholder="Buscar estudiante..." 
                            value={estudianteFilter} 
                            onChange={e => setEstudianteFilter(e.target.value)}
                            className="flex-1 px-4 py-2 bg-[#efe7dc] text-black border border-black rounded" 
                        />

                        <select 
                            value={grupoFilter} 
                            onChange={e => setGrupoFilter(e.target.value)}
                            className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded"
                        >
                            <option value="">Grupo</option>
                            {gruposUnicos.map((grupo, index) => (
                                <option key={index} value={grupo}>{grupo}</option>
                            ))}
                        </select>

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

                    </div>

                    <div className="bg-[#e1d7b7] border border-[#32569A] rounded-lg p-4">
                        <table className="min-w-full bg-[#e1d7b7] border-collapse rounded-lg">
                            <thead>
                                <tr className="bg-[#e1d7b7] text-black">
                                    <th className="py-2 px-4 border border-solid border-black">Fecha Entrega</th>
                                    <th className="py-2 px-4 border border-solid border-black">Estudiante</th>
                                    <th className="py-2 px-4 border border-solid border-black">HU</th>
                                    <th className="py-2 px-4 border border-solid border-black">Tarea</th> 
                                    <th className="py-2 px-4 border border-solid border-black">Calificación</th> 
                                    <th className="py-2 px-4 border border-solid border-black">Comentario</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {estudiantesDataPaginated.map((estudiante) => (
                                    <tr key={estudiante.idevaluacion}>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.fechaEntrega}
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.estudiante}
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.HU_idHU}
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.tarea}
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.calificacion}
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            {estudiante.comentario}
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
