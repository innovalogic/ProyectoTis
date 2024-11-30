import { useState,useEffect} from 'react';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';
import { useLocation,useNavigate } from 'react-router-dom';
import { useUser } from "../Componentes/UserContext";
import Modal from "../Componentes/Modal";



export default function RegistroEvFinalGrupo() {
    const [tipoEvaluacion, setTipoEvaluacion] = useState(""); // Estado para el tipo de evaluación seleccionado
    const location = useLocation();
    const { idGrupoEmpresa,logoUrl,nombreEmpresa,nombreCortoEmpresa } = location.state || {};
    const [estudiantes,setEstudiantes]=useState([]);
    const navigate = useNavigate();
    const { user } = useUser();
    const [grupos,setGrupos]=useState([]);
    const [grupoEvaluadorCruzado, setGrupoEvaluadorCruzado] = useState(); // Estado para el tipo de evaluación seleccionado
    const [evaluadores, setEvaluadores] = useState({}); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (shouldNavigate) {
            navigate('/RegistroEvFinal'); // Navegar solo si se indicó
        }
    };

    const handleEvaluadorChange = (estudianteId, evaluadorId) => {
        setEvaluadores(prevEvaluadores => ({
            ...prevEvaluadores,
            [estudianteId]: parseInt(evaluadorId, 10) // Actualiza el evaluador para el estudiante correspondiente
        }));
    };

    const handleSelectChange = (event) => {
        setTipoEvaluacion(event.target.value); // Actualiza el estado cuando se selecciona una opción
    };
    const handleSelectChangeGrupoEvaluador = (event) => {
        setGrupoEvaluadorCruzado(event.target.value); // Actualiza el estado cuando se selecciona una opción
    };
    const handleRegistrarClick = () => {
        navigate('/AñadirCriterios'); // Cambia esta ruta según sea necesario
        console.log("Entro aqui")
    };

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
    }, []);

    useEffect(() => {
        // Hacer una solicitud al backend para obtener los grupos empresa
        fetch(`http://localhost/proyectotis/backend/obtenerestudiantesgrupofinal.php?idGrupoEmpresa=${idGrupoEmpresa}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los grupos');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setEstudiantes(data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los grupos empresa:", error);
            });
    }, []);

    const handleGuardarEvaluacionCruzadaClick = async () => {
        const dataToSend = {
            tipoEvaluacionCruzada: 1, // Si es un tipo fijo, se mantiene
            idGrupoEmpresa: idGrupoEmpresa, // Asegúrate de que esta variable esté definida
            idDocente: user.idDocente, // Asegúrate de que user.idDocente esté disponible
            idevaluador: Number(grupoEvaluadorCruzado), // Asegúrate de que 'grupoEvaluadorCruzado' sea un número
            tipoevaluador:"GrupoEmpresa"
        };
    
        console.log("Datos a enviar:", dataToSend);
    
        try {
            const response = await fetch("http://localhost/proyectotis/backend/guardarEvaluacionFinalCruzada.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
    
            // Verificar si la respuesta es válida
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
    
            // Verificar si el cuerpo de la respuesta no está vacío
            const responseText = await response.text();
            const data = responseText ? JSON.parse(responseText) : { success: false, message: "No response data" };
    
            if (data.success) {
                setModalTitle("Éxito");
                setModalMessage("Evaluación Final guardada exitosamente.");
                setIsModalOpen(true);
                setShouldNavigate(true); 
                // Aquí puedes realizar cualquier acción adicional, como redirigir o limpiar el formulario
            } else {
                setModalTitle("Error");
                setModalMessage(`Hubo un error al guardar la evaluación. ${data.message}`);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error al guardar la evaluación:", error);
            setModalTitle("Error");
            setModalMessage("Hubo un error al guardar la evaluación.");
            setIsModalOpen(true);
        }
    };
    
    

    const handleGuardarEvaluacionAutoevaluacionClick = async () => {
        const dataToSend = estudiantes.map(estudiante => ({
            tipoEvaluacionAutoevaluacion: 3, // Tipo fijo
            idGrupoEmpresa: idGrupoEmpresa,
            idDocente: user.idDocente,
            idEstudiante: estudiante.idEstudiante,
            idEvaluador: estudiante.idEstudiante, // Usamos el evaluador seleccionado para ese estudiante
            tipoevaluador: "Estudiante",
        }));
    
        console.log("Datos a enviar:", dataToSend);
    
        try {
            const response = await fetch("http://localhost/proyectotis/backend/guardarEvaluacionFinalAutoEvaluacion.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
    
            // Verificar si la respuesta es válida
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
    
            // Verificar si el cuerpo de la respuesta no está vacío
            const responseText = await response.text();
            const data = responseText ? JSON.parse(responseText) : { success: false, message: "No response data" };
    
            if (data.success) {
                setModalTitle("Éxito");
                setModalMessage("Evaluación Final guardada exitosamente.");
                setIsModalOpen(true);
                setShouldNavigate(true); 
                // Aquí puedes realizar cualquier acción adicional, como redirigir o limpiar el formulario
            } else {
                setModalTitle("Error");
                setModalMessage(`Hubo un error al guardar la evaluación. ${data.message}`);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error al guardar la evaluación:", error);
            setModalTitle("Error");
            setModalMessage("Hubo un error al guardar la evaluación.");
            setIsModalOpen(true);
        }
    };

    const handleGuardarEvaluacionParesClick = async () => {
        // Generamos el objeto de datos con el id del estudiante y el id del evaluador
        const dataToSend = estudiantes.map(estudiante => ({
            tipoEvaluacionAutoevaluacion: 2, // Tipo fijo
            idGrupoEmpresa: idGrupoEmpresa,
            idDocente: user.idDocente,
            idEstudiante: estudiante.idEstudiante,
            idEvaluador: evaluadores[estudiante.idEstudiante], // Usamos el evaluador seleccionado para ese estudiante
            tipoevaluador: "Estudiante",
        }));
    
        // Verificar si hay algún evaluador sin asignar
        const tieneEvaluadoresInvalidos = dataToSend.some(item => !item.idEvaluador);
        if (tieneEvaluadoresInvalidos) {
            setModalTitle("Error");
            setModalMessage("Por favor, asegúrate de asignar un evaluador para todos los estudiantes.");
            setIsModalOpen(true);
            return; // Salir de la función si hay evaluadores sin asignar
        }
    
        console.log("Datos a enviar:", dataToSend);
    
        try {
            const response = await fetch("http://localhost/proyectotis/backend/guardarEvaluacionPares.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
    
            const responseText = await response.text();
            const data = responseText ? JSON.parse(responseText) : { success: false, message: "No response data" };
    
            if (data.success) {
                setModalTitle("Éxito");
                setModalMessage("Evaluación Final guardada exitosamente.");
                setIsModalOpen(true);
                setShouldNavigate(true); 
            } else {
                setModalTitle("Error");
                setModalMessage(`Hubo un error al guardar la evaluación. ${data.message}`);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error al guardar la evaluación:", error);
            setModalTitle("Error");
            setModalMessage("Hubo un error al guardar la evaluación.");
            setIsModalOpen(true);
        }
    };
    
    useEffect(() => {
        console.log(evaluadores);
    }, [evaluadores]);
    

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="flex h-full w-screen mt-[70px] bg-[#32569A]">
                <BarraLateralDocente />
                <div className="w-screen bg-[#efe7dc] p-4">
                    <h1 className="text-4xl font-bold text-[#32569A] text-center mb-4">Registrar Evaluación Final</h1>
                    <div className='flex'>
                    <div className='w-2/3'>
                    <div className="flex w-full p-2 bg-[#32569A] text-white border border-[#32569A] rounded gap-4 text-xl">
                            <div className="ml-2">
                                Grupo Empresa: {nombreEmpresa}
                            </div>
                            <div className="ml-2">
                                Siglas: {nombreCortoEmpresa}
                            </div>
                            <div className="ml-2">
                                Evaluacion: {tipoEvaluacion}
                            </div>
                    </div>
                    <h2 className="text-3xl font-bold text-[#32569A]  mb-4">Seleccionar Tipo de Evaluacion</h2>
                    <select
                        className="text-xl px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full"
                        value={tipoEvaluacion}
                        onChange={handleSelectChange}
                    >
                        <option value="" hidden>Seleccionar Tipo de Evaluación</option>
                        <option value="Cruzada" className="bg-white text-black border-2 border--[#32569A] rounded-md">Evaluación 1: Cruzada</option>
                        <option value="AutoEvaluacion" className="bg-white text-black border-2 border--[#32569A] rounded-md">Evaluación 2: Autoevaluación</option>
                        {estudiantes.length % 2 === 0 && (
                        <option value="Pares" className="bg-white text-black border-2 border--[#32569A] rounded-md">Evaluación 3: Pares</option>
                        )}
                    </select>
                    </div>
                    <div className='w-1/3 flex items-center justify-center'>
                    <img src={logoUrl} alt="Logo Empresa" className="w-full h-24 object-contain" />
                    </div>
                    </div>
                    {/* Renderiza otros combobox dependiendo de la opción seleccionada */}
                    {tipoEvaluacion === "Cruzada" && (
                        <div className="mt-4 flex flex-col">
                            <h2 className="text-3xl font-bold text-[#32569A]  mb-4">Seleccionar Grupo Evaluador</h2>
                            <select className="text-xl px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-2/3" onChange={handleSelectChangeGrupoEvaluador}>
                                <option value="" hidden>Seleccionar Grupo Evaluador</option>
                                {grupos.filter(grupo=>grupo.idGrupoEmpresa !== idGrupoEmpresa).map(grupo =>(
                                    <option value={grupo.idGrupoEmpresa} className="bg-white text-black border-2 border--[#32569A] rounded-md">Empresa Evaluadora {grupo.nombreEmpresa}</option>
                                ))}
                            </select>
                            <h2 className="text-3xl font-bold text-[#32569A] r mb-4">Agregar Criterios de Evaluacion</h2>
                            <div className="flex justify-between">
                            <div>
                            <button className=" text-xl mt-2 px-4 py-2 bg-[#32569A] hover:bg-blue-500 text-white border border-[#32569A] rounded" onClick={handleRegistrarClick}>
                                + Agregar Criterios para la Evaluacion Final
                            </button>
                            </div>
                            <div>
                            <button className=" text-xl mt-2 px-4 py-2 bg-[#32569A] hover:bg-blue-500 text-white border border-[#32569A] rounded" onClick={handleGuardarEvaluacionCruzadaClick}>
                                Guardar Evaluacion Final Cruzada
                            </button>
                            </div>
                            </div>
                        </div>
                    )}
                    {tipoEvaluacion === "AutoEvaluacion" && (
                        <div className="mt-4">
                            <h2 className="text-3xl font-bold text-[#32569A] r mb-4">Agregar Criterios de Evaluacion</h2>
                            <div className="flex justify-between">
                            <div>
                            <button className=" text-xl mt-2 px-4 py-2 bg-[#32569A] hover:bg-blue-500 text-white border border-[#32569A] rounded" onClick={handleRegistrarClick}>
                                + Agregar Criterios para la Evaluacion Final
                            </button>
                            </div>
                            <div>
                            <button className=" text-xl mt-2 px-4 py-2 bg-[#32569A] hover:bg-blue-500 text-white border border-[#32569A] rounded" onClick={handleGuardarEvaluacionAutoevaluacionClick}>
                                Guardar Evaluacion Final Autoevaluacion
                            </button>
                            </div>
                            </div>
                        </div>
                    )}
                    {tipoEvaluacion === "Pares" && (
                        <div className="mt-4">
                            <h2 className="text-3xl font-bold text-[#32569A]  mb-4">Seleccionar Estudiantes Evaluadores</h2>
                            <table className='w-full'>
                                <thead>
                                    <tr className="bg-[#e1d7b7] text-black">
                                        <th className="py-2 px-4 border border-solid border-black">Numero</th>
                                        <th className="py-2 px-4 border border-solid border-black">Estudiante</th>
                                        <th className="py-2 px-4 border border-solid border-black">Estudiante Calificador</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estudiantes.map(estudiante => (
                                       <tr className="bg-[#e1d7b7] text-black">
                                        <td className="py-2 px-4 border border-solid border-black">{estudiante.idEstudiante}</td>
                                        <td className="py-2 px-4 border border-solid border-black">{estudiante.nombreEstudiante+" "+estudiante.apellidoEstudiante}</td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                        <select
                                            className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full"
                                                                                    value={evaluadores[estudiante.idEstudiante] || ""} // Mostrar la selección actual para este estudiante
                                            onChange={(e) => handleEvaluadorChange(estudiante.idEstudiante, e.target.value)}
                                        >
                                            <option value="" >Seleccionar Estudiante Evaluador</option>
                                            {estudiantes
                                                .filter(evaluador => 
                                                    evaluador.idEstudiante !== estudiante.idEstudiante && // Excluir al estudiante actual
                                                    (evaluador.idEstudiante === evaluadores[estudiante.idEstudiante] || // Mostrar el evaluador seleccionado
                                                    !Object.values(evaluadores).includes(evaluador.idEstudiante)) // Filtrar evaluadores no seleccionados
                                                )
                                                .map(evaluador => (
                                                    <option
                                                        key={evaluador.idEstudiante}
                                                        value={evaluador.idEstudiante}
                                                        className="bg-white text-black border-2 border-[#32569A] rounded-md"
                                                    >
                                                        {evaluador.nombreEstudiante + " " + evaluador.apellidoEstudiante}
                                                    </option>
                                                ))}
                                        </select>
                                        </td>
                                       </tr> 
                                    ))}
                                </tbody>
                            </table>
                            <h2 className="text-3xl font-bold text-[#32569A] r mb-4">Agregar Criterios de Evaluacion</h2>
                            <div className="flex justify-between">
                            <div>
                            <button className=" text-xl mt-2 px-4 py-2 bg-[#32569A] hover:bg-blue-500 text-white border border-[#32569A] rounded" onClick={handleRegistrarClick}>
                                + Agregar Criterios para la Evaluacion Final
                            </button>
                            </div>
                            <div>
                            <button className=" text-xl mt-2 px-4 py-2 bg-[#32569A] hover:bg-blue-500 text-white border border-[#32569A] rounded" onClick={handleGuardarEvaluacionParesClick}>
                                Guardar Evaluacion Final Pares
                            </button>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Copyright />
            <Modal
                show={isModalOpen}
                onClose={handleCloseModal}
                title={modalTitle}
                message={modalMessage}
            />
        </>
    );
}
