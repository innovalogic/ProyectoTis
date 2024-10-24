import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../Componentes/UserContext";

export default function RecuperarEvaluacion() {
    const [estudiantesData, setEstudiantesData] = useState([]); 
    const [error, setError] = useState(null);
    const { setUser } = useUser();
    const { user } = useUser();
    const [filteredData, setFilteredData] = useState([]);
    const [grupoFilter, setGrupoFilter] = useState('');
    const [estudianteFilter, setEstudianteFilter] = useState('');
    const [fechaInicioFilter, setFechaInicioFilter] = useState('');
    const [calificacionFilter, setCalificacionFilter] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');
    const [grupos, setGrupos] = useState([]);
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
                const response = await axios.get('http://localhost/proyectotis/backend/CargarEvaluaciones.php', {
                    params: { idDocente: user.idDocente  }
                });
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

    const cargarDatosGrupo = async (idDocente) => {
        try {
            const response = await axios.get('http://localhost/proyectotis/backend/CargarGrupoDocente.php', {
                params: { idDocente }
            });

            if (response.data && response.data.success && Array.isArray(response.data.datos)) {
                setGrupos(response.data.datos.map(dato => ({
                    idGrupoEmpresa: dato.idGrupoEmpresa,
                    nombreCortoEmpresa: dato.nombreCortoEmpresa
                })));
                console.log(grupos)
            } else {
                setGrupos([]); 
            }
        } catch (error) {
            console.error('Error al cargar los datos del grupo:', error.message);
            setGrupos([]); 
        }
    };

    useEffect(() => {
        cargarDatosGrupo(2); 
    }, []);


    const applyFilters = () => {
        let filtered = estudiantesData;

        if (grupoFilter) {
            filtered = filtered.filter(estudiante => estudiante.grupo === Number(grupoFilter)); // Convertir a número si es necesario
        }
    
    
        if (estudianteFilter) {
            filtered = filtered.filter(estudiante => 
                `${estudiante.estudiante} `.toLowerCase().includes(estudianteFilter.toLowerCase())
            );
        }
    
        if (fechaInicioFilter) {
            filtered = filtered.filter(estudiante => {
                const fechaEvaluacion = new Date(estudiante.fechaEntrega).toDateString();
                const fechaSeleccionada = new Date(fechaInicioFilter).toDateString();
                return fechaEvaluacion === fechaSeleccionada;
            });
        }
    
        if (calificacionFilter) {
            filtered = filtered.filter(estudiante => {
                const calificacion = parseFloat(estudiante.calificacion);
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
        if (estudiantesData.length > 0) {
            applyFilters();
        }
    }, [grupoFilter, estudianteFilter, fechaInicioFilter, calificacionFilter, estadoFilter, estudiantesData]);


    const totalPages = Math.ceil(filteredData.length / itemsPerPage); 

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
                            onChange={e => setGrupoFilter(Number(e.target.value))}
                            className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded"
                            aria-label="Seleccionar grupo"
                        >
                            <option value="">Grupo</option>
                            {grupos.map((grupo) => (
                                <option key={grupo.idGrupoEmpresa} value={grupo.idGrupoEmpresa}>
                                    {grupo.nombreCortoEmpresa}
                                </option>
                            ))}
                        </select>

                        <select 
                            value={calificacionFilter} 
                            onChange={e => setCalificacionFilter(e.target.value)}
                            className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded "
                        >
                            <option value="">Calificación</option>
                            <option value="menor_51">Menor a 51</option>
                            <option value="mayor_51">Mayor a 51</option>
                            <option value="mayor_80">Mayor a 80</option>
                        </select>

                        <select 
                            value={estadoFilter} 
                            onChange={e => setEstadoFilter(e.target.value)}
                            className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded"
                        >
                            <option value="">Estado</option>
                            <option value="Revisada">Entregada</option>
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
                                e.preventDefault(); 
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
