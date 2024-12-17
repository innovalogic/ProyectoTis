import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';
import React, { useEffect, useState } from 'react';
import { useUser } from "../Componentes/UserContext";
import ModalLinks from '../Componentes/ModalLinks';
import Modal from "../Componentes/Modal";

export default function RegistroEvSemanales() {
    const [grupos, setGrupos] = useState([]);
    const [sprints, setSprints] = useState([]); // Nuevo estado para los sprints
    const [selectedGrupo, setSelectedGrupo] = useState(''); // Estado para el grupo seleccionado
    const { user } = useUser();
    const [semanas, setSemanas] = useState([]); // Nuevo estado para las semanas
    const [selectedSprint, setSelectedSprint] = useState('');
    const [selectedSemana, setSelectedSemana] = useState('');
    const [estudiantes, setEstudiantes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null); // Estado para controlar qué fila se está editando
    const [editedValues, setEditedValues] = useState({});
    const [evaluaciones, setEvaluaciones] = useState([]);

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

    useEffect(() => {
        const fetchEstudiantesConEvaluaciones = async () => {
            if (selectedGrupo && selectedSprint && selectedSemana) {
                console.log(selectedGrupo, selectedSprint, selectedSemana);
                
                try {
                    const response = await fetch(`http://localhost/proyectotis/backend/buscarEstudiantesdelgrupo.php?grupo=${selectedGrupo}&sprint=${selectedSprint}&semana=${selectedSemana}`);
                    console.log("Respuesta del servidor:", response); 
    
                    if (!response.ok) {
                        throw new Error('Error al obtener los estudiantes');
                    }
    
                    const data = await response.json();
                    console.log(data);
    
                    // Verificamos si cada estudiante tiene evaluaciones anteriores
                    const estudiantesConEvaluaciones = await Promise.all(data.map(async estudiante => {
                        console.log(estudiante.idEstudiante,selectedSemana)
                        const response = await fetch(`http://localhost/proyectotis/backend/buscarEvaluacionAnterior.php?idEstudiante=${estudiante.idEstudiante}&semana=${selectedSemana ? semanas.find(semana => semana.inicio === selectedSemana)?.nombre:''}`);
                        const text = await response.text(); // Verificamos el contenido en texto puro
                        console.log("Respuesta cruda:", text); // Mostramos la respuesta cruda
                    
                        const evaluacion = JSON.parse(text); // Intentamos convertirla a JSON
                        console.log(evaluacion);
                    
                        // Agregar la evaluación anterior si existe, de lo contrario dejar los campos vacíos
                        return {
                            ...estudiante,
                            calificacion: evaluacion?.calificacion || '', 
                            comentario: evaluacion?.comentario || ''
                        };
                    }));
    
                    setEstudiantes(estudiantesConEvaluaciones);
                } catch (error) {
                    console.error("Hubo un error al obtener los estudiantes:", error);
                }
            } else {
                setEstudiantes([]); // Limpiar estudiantes si no se seleccionan todos los valores
            }
        };
    
        fetchEstudiantesConEvaluaciones();
    }, [selectedGrupo, selectedSprint, selectedSemana]);
    
    
    
    const handleOpenModal = (estudiante) => {
        setEstudianteSeleccionado(estudiante);
        setModalOpen(true);
    };
    
    const handleEdit = (index) => {
        setEditingIndex(index); // Activa el modo de edición para esta fila
        setEditedValues({
            calificacion: estudiantes[index].calificacion || '',
            comentario: estudiantes[index].comentario || ''
        });
    };

    const handleSave = (index) => {
        // Aquí puedes manejar la lógica para guardar los cambios en la base de datos o en el estado
        const updatedEstudiantes = [...estudiantes];
        updatedEstudiantes[index].calificacion = editedValues.calificacion;
        updatedEstudiantes[index].comentario = editedValues.comentario;
        //setEstudiantes(updatedEstudiantes); // Actualiza la lista de estudiantes con los cambios
        setEditingIndex(null); // Sale del modo de edición
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleGuardarEvaluaciones = () => {
        // Verificar que todos los estudiantes tengan calificación y comentario
        const faltanDatos = estudiantes.some(estudiante => !estudiante.calificacion || !estudiante.comentario);

        if (faltanDatos) {
        alert("Por favor, asegúrate de que todos los estudiantes tengan una calificación y un comentario antes de guardar.");
        return; // Detener la ejecución si falta algún dato
        }
        const nuevaEvaluacion = estudiantes.map(estudiante => ({
            semana:selectedSemana ? semanas.find(semana => semana.inicio === selectedSemana)?.nombre:'',
            idEstudiante:estudiante.idEstudiante,
            Estudiante: estudiante.responsable, 
            tarea:estudiante.titulo,
            calificacion: estudiante.calificacion || '',
            comentario: estudiante.comentario || '',
            grupo:estudiante.HU_Sprint_GrupoEmpresa_idGrupoEmpresa,
            fechaEntrega:estudiante.fechaEntrega,
            idTarea:estudiante.idTarea,
            HU_idHU:estudiante.HU_idHU,
            HU_Sprint_idSprint:estudiante.HU_Sprint_idSprint,
            HU_Sprint_GrupoEmpresa_idGrupoEmpresa:estudiante.HU_Sprint_GrupoEmpresa_idGrupoEmpresa,
            idDocente:user.idDocente
        }));

        // Guarda en el estado
        setEvaluaciones(nuevaEvaluacion);
        console.log("Evaluaciones guardadas:", nuevaEvaluacion);

        fetch('http://localhost/proyectotis/backend/guardarEvaluaciones.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaEvaluacion),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(data.message);
                alert("Se registro las evaluaciones de los estudiantes")
                // Aquí puedes agregar lógica adicional, como cerrar el modal o mostrar un mensaje
            } else {
                console.error("Error al guardar evaluaciones:", data.message);
            }
        })
        .catch(error => {
            console.error("Hubo un error al enviar la evaluación:", error);
        });

        
    };

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="flex w-screen mt-[70px] bg-[#32569A]"  style={{ height: 'calc(-110px + 100vh)', marginTop: '70px' }}>
                <BarraLateralDocente />
                <div className="w-screen bg-[#efe7dc] p-4" style={{  overflowY: 'auto'  }}>
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
                            <option key={index} value={semana.inicio} className="bg-white text-black border-2 border--[#32569A] rounded-md">
                                {semana.nombre} (Desde: {semana.inicio} - Hasta: {semana.fin})
                            </option>
                        ))}
                    </select>


                    <div className="flex justify-between mt-10 -mb-4 ml-4 mr-4 relative">
                        <div className="flex w-2/4 p-2 bg-[#32569A] text-white border border-[#32569A] rounded">
                            <div className="ml-2">Grupo Empresa: {grupos.find(grupo => grupo.idGrupoEmpresa === Number(selectedGrupo))?.nombreEmpresa || ' '}</div>
                            <div className="ml-2">Sprint: {sprints.find(sprint => sprint.idSprint === Number(selectedSprint))?.nomSprint || ' '}</div>
                            <div className="ml-2">
                                Semana: {selectedSemana ? semanas.find(semana => semana.inicio === selectedSemana)?.nombre : ' '}
                            </div>
                        </div>
                        <div className="w-1/3 p-2 bg-[#32569A] text-white border border-[#32569A] rounded">
                            Fecha Inicio: {selectedSemana ? semanas.find(semana => semana.inicio === selectedSemana)?.inicio : ' '} - 
                            Fecha Fin: {selectedSemana ? semanas.find(semana => semana.inicio === selectedSemana)?.fin : ' '}
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
                                    <th className="py-2 px-4 border border-solid border-black">Fecha Entrega</th>
                                    <th className="py-2 px-4 border border-solid border-black">Calificación</th>
                                    <th className="py-2 px-4 border border-solid border-black">Comentario</th>
                                    <th className="py-2 px-4 border border-solid border-black">Edición</th>
                                </tr>
                            </thead>
                            <tbody>
                                {estudiantes.length > 0 ? (
                                    estudiantes.map((estudiante, index) => (
                                        <tr key={index} className="bg-white text-black">
                                            <td className="py-2 px-4 border border-solid border-black">
                                                {selectedSemana} {/* Asegúrate de que este campo exista en los datos */}
                                            </td>
                                            <td className="py-2 px-4 border border-solid border-black">
                                                {estudiante.responsable} {/* Cambia esto según la estructura de tu API */}
                                            </td>
                                            <td className="py-2 px-4 border border-solid border-black">
                                                {estudiante.HU_idHU} {/* Asegúrate de que este campo exista en los datos */}
                                            </td>
                                            <td className="py-2 px-4 border border-solid border-black">
                                                {estudiante.titulo} {/* Asegúrate de que este campo exista en los datos */}
                                            </td>
                                            <td className="py-2 px-4 border border-solid border-black">
                                                <button 
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                onClick={() => handleOpenModal(estudiante)}
                                                >Links</button>
                                            </td>
                                            <td className="py-2 px-4 border border-solid border-black">
                                                {estudiante.fechaEntrega}
                                            </td>
                                            <td className="py-2 px-4 border border-solid border-black">
                                                {editingIndex === index ? (
                                                    <div className="flex items-center">
                                                        <input
                                                            type="text" // Cambiamos a tipo 'text'
                                                            name="calificacion"
                                                            value={editedValues.calificacion}
                                                            onChange={(e) => {
                                                                // Convertimos el valor a número, aseguramos que sea entre 0 y 100
                                                                let numericValue = parseInt(e.target.value.replace(/\D/g, ''), 10); // Elimina todo lo que no sea número
                                                                if (isNaN(numericValue)) numericValue = 0; // Valor por defecto si no es un número
                                                                numericValue = Math.max(0, Math.min(100, numericValue)); // Limita entre 0 y 100
                                                            
                                                                // Actualizamos el estado con el valor transformado
                                                                handleInputChange({
                                                                    target: {
                                                                        name: e.target.name,
                                                                        value: numericValue,
                                                                    },
                                                                });
                                                            }}
                                                            className="px-2 py-1 border border-gray-300 rounded w-12" // Hacemos el input más pequeño con 'w-12'
                                                        />
                                                        <span className="ml-2">/100</span> {/* Texto al lado del input */}
                                                    </div>
                                                ) : (
                                                    `${estudiante.calificacion || '0'}/100`
                                                )}
                                            </td>



                                            <td className="py-2 px-4 border border-solid border-black">
                                                {editingIndex === index ? (
                                                    <input
                                                        type="text"
                                                        name="comentario"
                                                        value={editedValues.comentario}
                                                        onChange={handleInputChange}
                                                        className="px-2 py-1 border border-gray-300 rounded"
                                                    />
                                                ) : (
                                                    estudiante.comentario || ''
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border border-solid border-black">
                                                {editingIndex === index ? (
                                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleSave(index)}>
                                                        Guardar
                                                    </button>
                                                ) : (
                                                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleEdit(index)}>
                                                        Editar
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="py-2 px-4 text-center border border-solid border-black">
                                            No hay estudiantes disponibles para esta semana.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                        <div className="flex justify-end">
                            <button 
                                className="mt-3 px-4 py-2 bg-[#32569A] hover:bg-blue-500 text-white border border-[#32569A] rounded"
                                onClick={handleGuardarEvaluaciones}>
                                Guardar Todas las Evaluaciones
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalLinks isOpen={modalOpen} onClose={() => setModalOpen(false)} estudiante={estudianteSeleccionado} />
            <Copyright />
        </>
    );
}
