import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';
import React, { useEffect, useState } from 'react';
import { useUser } from "../Componentes/UserContext";

export default function RegistroEvSemanales() {
    const [grupos, setGrupos] = useState([]);
    const [sprints, setSprints] = useState([]); // Nuevo estado para los sprints
    const [selectedGrupo, setSelectedGrupo] = useState(''); // Estado para el grupo seleccionado
    const { user } = useUser();
    const [semanas, setSemanas] = useState([]); // Nuevo estado para las semanas
    const [selectedSprint, setSelectedSprint] = useState('');
    const [selectedSemana, setSelectedSemana] = useState('');

    useEffect(() => {
        // Hacer una solicitud al backend para obtener los grupos empresa
        fetch(`http://localhost/proyectotis/backend/obtenergruposevsem.php?idDocente=${user.idDocente}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los grupos');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setGrupos(data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los grupos empresa:", error);
            });
    }, [user.idDocente]);

    // Efecto para cargar los sprints cuando se selecciona un grupo
    useEffect(() => {
        console.log(selectedGrupo)
        if (selectedGrupo) {
            fetch(`http://localhost/proyectotis/backend/obtenergruposevsemsprints.php?idGrupo=${selectedGrupo}`) // Cambia la ruta según tu estructura
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los sprints');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setSprints(data);
                })
                .catch(error => {
                    console.error("Hubo un error al obtener los sprints:", error);
                });
        } else {
            setSprints([]); // Limpiar sprints si no hay grupo seleccionado
        }
    }, [selectedGrupo]);

    // Efecto para cargar las semanas cuando se selecciona un sprint
    useEffect(() => {
        if (selectedGrupo && sprints.length) {
        console.log("Selected Sprint ID:", selectedSprint); 
        const sprintSeleccionado = sprints.find(sprint => sprint.idSprint === Number(selectedSprint));// Usa el idSprint seleccionado
        console.log(sprintSeleccionado)
        if (sprintSeleccionado) {
            const semanasCalculadas = calcularSemanas(sprintSeleccionado.fechaInicio, sprintSeleccionado.fechaFin);
            setSemanas(semanasCalculadas);
        }
        } else {
        setSemanas([]); // Limpiar semanas si no hay sprint seleccionado
        }
    }, [selectedGrupo, sprints, selectedSprint]);

    const calcularSemanas = (fechaInicio, fechaFin) => {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        
        // Ajustar la fecha de inicio al próximo lunes
        if (inicio.getDay() !== 1) {
            const diasHastaLunes = (7 - inicio.getDay() + 1) % 7; // 1 es lunes
            inicio.setDate(inicio.getDate() + diasHastaLunes);
        }
        
        // Ajustar la fecha de fin al viernes más cercano
        if (fin.getDay() !== 5) {
            const diasHastaViernes = (5 - fin.getDay() + 7) % 7;
            fin.setDate(fin.getDate() + diasHastaViernes);
        }
        
        // Calcular la diferencia en milisegundos
        const diferenciaEnMilisegundos = fin - inicio;
        const dias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24); // Convertir a días
        
        // Calcular el número de semanas hábiles (5 días por semana)
        const semanas = Math.floor(dias / 5);
        
        // Generar un arreglo de semanas con fechas
        const semanasConFechas = Array.from({ length: semanas }, (_, i) => {
            const semanaInicio = new Date(inicio);
            semanaInicio.setDate(inicio.getDate() + (i * 7)); // Establecer inicio de la semana
    
            const semanaFin = new Date(semanaInicio);
            semanaFin.setDate(semanaInicio.getDate() + 4); // Establecer fin de la semana (5 días)
    
            return {
                nombre: `Semana ${i + 1}`,
                inicio: semanaInicio.toLocaleDateString('es-ES'), // Cambiado a formato día/mes/año
                fin: semanaFin.toLocaleDateString('es-ES'), // Cambiado a formato día/mes/año
            };
        });
    
        return semanasConFechas;
    };
    
    

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="flex h-full w-screen mt-[70px] bg-[#32569A]">
                <BarraLateralDocente />
                <div className="w-screen bg-[#efe7dc] p-4">
                    <h1 className="text-4xl font-bold text-[#32569A] text-center mb-4">Registrar Evaluaciones Semanales</h1>
                    <select
                        className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded"
                        onChange={e => setSelectedGrupo(e.target.value)} // Manejar el cambio de grupo
                    >
                        <option value="" hidden>Seleccionar Grupo</option>
                        {grupos.map(grupo => (
                            <option key={grupo.idGrupoEmpresa} value={grupo.idGrupoEmpresa} className="bg-white text-black border-2 border--[#32569A] rounded-md">
                                Grupo: {grupo.nombreEmpresa}
                            </option>
                        ))}
                    </select>
                    <select 
                    className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded"
                    onChange={e => {
                        setSelectedSprint(e.target.value);
                        setSelectedSemana(''); // Limpiar la selección de semana
                    }}
                    >
                    <option value="" hidden>Seleccionar Sprint</option>
                    {sprints.map(sprint => (
                        <option key={sprint.idSprint} value={sprint.idSprint} className="bg-white text-black border-2 border--[#32569A] rounded-md">
                            {sprint.nomSprint} (Inicio: {sprint.fechaInicio} - Fin: {sprint.fechaFin})
                        </option>
                    ))}
                    </select>
                    <select className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded" onChange={e => setSelectedSemana(e.target.value)}>
                        <option value="" hidden>Seleccionar Semana</option>
                        {semanas.map((semana, index) => (
                            <option key={index} value={`semana${index + 1}`} className="bg-white text-black border-2 border--[#32569A] rounded-md">
                                {semana.nombre} (Desde: {semana.inicio} - Hasta: {semana.fin})
                            </option>
                        ))}
                    </select>


                    <div className="flex justify-between mt-10 -mb-4 ml-4 mr-4 relative">
                        <div className="flex w-2/4 p-2 bg-[#32569A] text-white border border-[#32569A] rounded">
                            <div className="ml-2">Grupo Empresa: {grupos.find(grupo => grupo.idGrupoEmpresa === Number(selectedGrupo))?.nombreEmpresa || ' '} </div>
                            <div className="ml-2">Sprint: {sprints.find(sprint => sprint.idSprint === Number(selectedSprint))?.nomSprint || ' '} </div>
                            <div className="ml-2">Semana: {selectedSemana ? semanas.find((_, i) => `semana${i + 1}` === selectedSemana)?.nombre : ' '} </div>
                        </div>
                        <div className="w-1/3 p-2 bg-[#32569A] text-white border border-[#32569A] rounded">
                            Fecha Inicio: {selectedSemana ? semanas.find((_, i) => `semana${i + 1}` === selectedSemana)?.inicio : ' '} - 
                            Fecha Fin: {selectedSemana ? semanas.find((_, i) => `semana${i + 1}` === selectedSemana)?.fin : ' '}
                        </div>
                    </div>

                    <div className="bg-[#e1d7b7] border-4 border-[#32569A] rounded-lg p-4">
                        <table className="min-w-full bg-[#e1d7b7] border-collapse rounded-lg">
                            <thead>
                                <tr className="bg-[#e1d7b7] text-black">
                                    <th className="py-2 px-4 border border-solid border-black">Semana</th>
                                    <th className="py-2 px-4 border border-solid border-black">Estudiante</th>
                                    <th className="py-2 px-4 border border-solid border-black">HU</th>
                                    <th className="py-2 px-4 border border-solid border-black">Tarea</th>
                                    <th className="py-2 px-4 border border-solid border-black">Links</th>
                                    <th className="py-2 px-4 border border-solid border-black">Estado tareas</th>
                                    <th className="py-2 px-4 border border-solid border-black">Calificación</th>
                                    <th className="py-2 px-4 border border-solid border-black">Detalle</th>
                                    <th className="py-2 px-4 border border-solid border-black">Edición</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white text-black">
                                    <td className="py-2 px-4 border border-solid border-black">Semana 1</td>
                                    <td className="py-2 px-4 border border-solid border-black">Juan Pérez</td>
                                    <td className="py-2 px-4 border border-solid border-black">HU01</td>
                                    <td className="py-2 px-4 border border-solid border-black">Tarea A</td>
                                    <td className="py-2 px-4 border border-solid border-black">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Links</button>
                                    </td>
                                    <td className="py-2 px-4 border border-solid border-black">Completado</td>
                                    <td className="py-2 px-4 border border-solid border-black">80/100</td>
                                    <td className="py-2 px-4 border border-solid border-black">Buen trabajo</td>
                                    <td className="py-2 px-4 border border-solid border-black">
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Editar</button>
                                    </td>
                                </tr>
                                {/* Otros registros */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Copyright />
        </>
    );
}
