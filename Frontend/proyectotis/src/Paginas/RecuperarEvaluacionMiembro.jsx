import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralEstudiante from '../Componentes/BarraLateralEstudiante';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../Componentes/UserContext";

export default function RecuperarEvaluacionMiembro() {

    const { setUser } = useUser();
    const { user } = useUser();
    const [error, setError] = useState(null);
    const [estudiantesData, setEstudiantesData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]);
    const [grupoFilter, setGrupoFilter] = useState('');
    const [estudianteFilter, setEstudianteFilter] = useState('');
    const [fechaInicioFilter, setFechaInicioFilter] = useState('');
    const [calificacionFilter, setCalificacionFilter] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');
    const [DatosGrupo, setDatosGrupo] = useState([]); 

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
        const fetchEstudiantesYMiembro = async () => {
            try {
                const responseEstudiantes = await axios.get('http://innovalogic.tis.cs.umss.edu.bo/CargarEvaluacionEstudiante.php', {
                    params: { idEstudiante: user.idEstudiante },
                });
    
                if (responseEstudiantes.data.success === true) {
                    setEstudiantesData(responseEstudiantes.data.datos);
                    setFilteredData(responseEstudiantes.data.datos);
                } else {
                    setError('No se pudo obtener los datos de estudiantes.');
                }
                setDatosGrupo (await cargarDatosMiembro(user.idEstudiante));
                console.log('Respuesta del servidor (grupo):', { datosGrupo: DatosGrupo  });
    
            } catch (error) {
                setError('Error al conectarse al servidor: ' + error.message);
            }
        };
    
        fetchEstudiantesYMiembro();
    }, []);
    
    const cargarDatosMiembro = async (idEstudiante) => {
        try {
            const response = await axios.get('http://innovalogic.tis.cs.umss.edu.bo/CargarGrupo.php', {
                params: { idEstudiante }
            });
    
            if (response.data && response.data.success && Array.isArray(response.data.datos) && response.data.datos.length > 0) {
                return response.data.datos[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al cargar los datos del grupo:', error.message);
            return null;
        }
    };


    const applyFilters = () => {
        let filtered = estudiantesData;
    
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
                filtered = filtered.filter(estudiante => estudiante.calificacion === "Sin Entregar"); 
            } else if (estadoFilter === "Entregada") {
                filtered = filtered.filter(estudiante => !isNaN(estudiante.calificacion)); 
            }
        }
    
        setFilteredData(filtered);
        setCurrentPage(1);  
    };

    useEffect(() => {
        applyFilters();
    }, [grupoFilter, estudianteFilter, fechaInicioFilter, calificacionFilter, estadoFilter]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="flex flex-col sm:flex-row h-full mt-16 bg-[#32569A]"  style={{ height: 'calc(-110px + 100vh)', marginTop: '70px'}}>
                <BarraLateralEstudiante />
                <form className="flex-1 p-4 bg-[#c2d2e9] rounded-md space-y-4" style={{  overflowY: 'auto'  }}>
                    <h1 className="text-2xl font-bold text-center text-[#32569A] mb-4">Recuperar Evaluaciones Miembro</h1>

                    <div className="flex items-center gap-4 mb-4">
                        <img 
                            src={DatosGrupo.logoEmpresa} 
                            alt={DatosGrupo.nombreCortoEmpresa} 
                            className="w-24 h-24" 
                        />

                        <div className="flex flex-col">
                            <p className="text-2xl font-bold">
                                {DatosGrupo.nombreEmpresa}
                            </p>
                            
                            <p className="text-sm text-gray-600">
                                {DatosGrupo.nombreCortoEmpresa}
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

                        <select 
                            value={calificacionFilter} 
                            onChange={e => setCalificacionFilter(e.target.value)}
                            className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full"
                        >
                            <option value="">Calificación</option>
                            <option value="menor_51">Menor a 51</option>
                            <option value="mayor_51">Mayor a 51</option>
                            <option value="mayor_80">Mayor a 80</option>
                        </select>

                        <select 
                            value={estadoFilter} 
                            onChange={e => setEstadoFilter(e.target.value)}
                            className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full"
                        >
                            <option value="">Estado</option>
                            <option value="Entregada">Entregada</option>
                            <option value="Sin Entregar">Sin Entregar</option>
                        </select>

                        <input 
                            type="date" 
                            value={fechaInicioFilter} 
                            onChange={e => setFechaInicioFilter(e.target.value)}
                            className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full"
                        />
                    </div>

                    <div className="bg-[#c2d2e9] border border-[#c2d2e9] rounded-lg p-4">
                    <table className="min-w-full bg-[#c2d2e9] border-collapse rounded-lg">
                            <thead>
                                <tr className="bg-[#c2d2e9] text-black">
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
                                onClick={(e) => handlePageChange(page, e)} 
                                className={`py-2 px-4 ${page === currentPage ? 'bg-[#32569A] text-white' : 'bg-[#c2d2e1] text-black'} rounded mx-1`}
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
