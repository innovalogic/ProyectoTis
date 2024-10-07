import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecuperarEvaluacion() {
    const [estudiantesData, setEstudiantesData] = useState([]); 
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(25);
    const [filteredData, setFilteredData] = useState([]);
    
    const [grupoFilter, setGrupoFilter] = useState('');
    const [estudianteFilter, setEstudianteFilter] = useState('');
    const [fechaFilter, setFechaFilter] = useState('');
    const [calificacionFilter, setCalificacionFilter] = useState('');

    const estudiantesDataLimited = filteredData.slice(0, limit);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit + 25);
    };

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const response = await axios.get('http://localhost/proyectotis/backend/CargarEstudiantes.php');
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

        if (fechaFilter) {
            filtered = filtered.filter(estudiante => estudiante.fecha === fechaFilter);
        }

        if (calificacionFilter) {
            filtered = filtered.filter(estudiante => estudiante.calificacion === calificacionFilter);
        }

        setFilteredData(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [grupoFilter, estudianteFilter, fechaFilter, calificacionFilter]);

    return (
    <>
        <NavbarInicioDeSesion />
        <div style={{ display: 'flex', height: '100%', marginTop: '70px', backgroundColor: '#32569A' }}>
            <BarraLateralDocente/>
            <form className={`space-y-4 p-4 flex-1 bg-[#efe7dc] rounded-md` }>
                <h1 className="text-2xl font-bold text-[#32569A] text-center mb-4">Recuperar Evaluaciones</h1>

                <div className="flex space-x-4 mb-4">
                    <input 
                        type="text" 
                        placeholder="Buscar estudiante..." 
                        value={estudianteFilter} 
                        onChange={e => setEstudianteFilter(e.target.value)}
                        className="px-4 py-2 border rounded"
                    />

                    <select 
                        value={grupoFilter} 
                        onChange={e => setGrupoFilter(e.target.value)}
                        className="px-4 py-2 border rounded"
                    >
                        <option value="">Seleccionar Grupo</option>
                        <option value="Grupo 1">Grupo 1</option>
                        <option value="Grupo 2">Grupo 2</option>
                    </select>

                    <input 
                        type="date" 
                        value={fechaFilter} 
                        onChange={e => setFechaFilter(e.target.value)}
                        className="px-4 py-2 border rounded"
                    />

                    <select 
                        value={calificacionFilter} 
                        onChange={e => setCalificacionFilter(e.target.value)}
                        className="px-4 py-2 border rounded"
                    >
                        <option value="">Seleccionar Calificación</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                <table className="min-w-full bg-[#efe7dc] border-collapse rounded-lg">
                    <thead>
                        <tr className="bg-[#efe7dc] text-black">
                            <th className="py-2 px-4 border border-solid border-black">Fecha</th>
                            <th className="py-2 px-4 border border-solid border-black">Estudiante</th>
                            <th className="py-2 px-4 border border-solid border-black">Semestre</th>
                            <th className="py-2 px-4 border border-solid border-black">Grupo</th> 
                            <th className="py-2 px-4 border border-solid border-black">Calificación</th> 
                            <th className="py-2 px-4 border border-solid border-black">Detalles</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {estudiantesDataLimited.map((estudiante) => (
                            <tr key={estudiante.idEstudiante}>
                                <td className="py-2 px-4 border border-solid border-black">{estudiante.fecha}</td>
                                <td className="py-2 px-4 border border-solid border-black">
                                    {`${estudiante.nombreEstudiante} ${estudiante.apellidoEstudiante}`}
                                </td>
                                <td className="py-2 px-4 border border-solid border-black">
                                    {`${estudiante.nombreDocente} ${estudiante.apellidoDocente}`}
                                </td>
                                <td className="py-2 px-4 border border-solid border-black">
                                    {estudiante.grupo}
                                </td>
                                <td className="py-2 px-4 border border-solid border-black">
                                    {estudiante.calificacion}
                                </td>
                                <td className="py-2 px-4 border border-solid border-black">
                                    {estudiante.detalles}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleLoadMore} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">
                    Cargar más
                </button>
            </form>
        </div>
        <Copyright/>
    </>
    );
}
