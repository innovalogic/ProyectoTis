import { useState } from 'react';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';

export default function RegistroEvFinalGrupo() {
    const [tipoEvaluacion, setTipoEvaluacion] = useState(""); // Estado para el tipo de evaluación seleccionado
    const [criterios, setCriterios] = useState("");

    const handleSelectChange = (event) => {
        setTipoEvaluacion(event.target.value); // Actualiza el estado cuando se selecciona una opción
    };

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="flex h-full w-screen mt-[70px] bg-[#32569A]">
                <BarraLateralDocente />
                <div className="w-screen bg-[#efe7dc] p-4">
                    <h1 className="text-4xl font-bold text-[#32569A] text-center mb-4">Registrar Evaluación Final</h1>
                    <h2 className="text-3xl font-bold text-[#32569A]  mb-4">Seleccionar Tipo de Evaluacion</h2>
                    <select
                        className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-1/2"
                        value={tipoEvaluacion}
                        onChange={handleSelectChange}
                    >
                        <option value="" hidden>Seleccionar Tipo de Evaluación</option>
                        <option value="Cruzada" className="bg-white text-black border-2 border--[#32569A] rounded-md">Evaluación 1: Cruzada</option>
                        <option value="AutoEvaluacion" className="bg-white text-black border-2 border--[#32569A] rounded-md">Evaluación 2: Autoevaluación</option>
                        <option value="Pares" className="bg-white text-black border-2 border--[#32569A] rounded-md">Evaluación 3: Pares</option>
                    </select>

                    {/* Renderiza otros combobox dependiendo de la opción seleccionada */}
                    {tipoEvaluacion === "Cruzada" && (
                        <div className="mt-4 flex flex-col">
                            <h2 className="text-3xl font-bold text-[#32569A]  mb-4">Seleccionar Grupo Evaluador</h2>
                            <select className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-1/2">
                                <option value="" hidden>Seleccionar Grupo Evaluador</option>
                                <option value="1" className="bg-white text-black border-2 border--[#32569A] rounded-md">Grupo Empresa 404</option>
                                <option value="2" className="bg-white text-black border-2 border--[#32569A] rounded-md">Grupo Empresa Devlogic</option>
                            </select>
                            <h2 className="text-3xl font-bold text-[#32569A] r mb-4">Agregar Criterios de Evaluacion</h2>
                            <textarea
                                className="mt-2 w-1/2 px-4 py-2 bg-white border border-[#32569A] rounded"
                                rows="4"
                                placeholder="Agregar criterios de evaluación..."
                                value={criterios}
                                onChange={(e) => setCriterios(e.target.value)}
                            />
                        </div>
                    )}
                    {tipoEvaluacion === "AutoEvaluacion" && (
                        <div className="mt-4">
                            <h2 className="text-3xl font-bold text-[#32569A] r mb-4">Agregar Criterios de Evaluacion</h2>
                            <textarea
                                className="mt-2 w-1/2 px-4 py-2 bg-white border border-[#32569A] rounded"
                                rows="4"
                                placeholder="Agregar criterios de evaluación..."
                                value={criterios}
                                onChange={(e) => setCriterios(e.target.value)}
                            />
                        </div>
                    )}
                    {tipoEvaluacion === "Pares" && (
                        <div className="mt-4">
                            <h2 className="text-3xl font-bold text-[#32569A]  mb-4">Seleccionar Estudiantes Evaluadores</h2>
                            <table className='w-2/3'>
                                <thead>
                                    <tr className="bg-[#e1d7b7] text-black">
                                        <th className="py-2 px-4 border border-solid border-black">Numero</th>
                                        <th className="py-2 px-4 border border-solid border-black">Estudiante</th>
                                        <th className="py-2 px-4 border border-solid border-black">Estudiante Calificador</th>
                                        <th className="py-2 px-4 border border-solid border-black">Edición</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-[#e1d7b7] text-black">
                                        <td className="py-2 px-4 border border-solid border-black">1</td>
                                        <td className="py-2 px-4 border border-solid border-black">Emanuel Peredo</td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                        <select className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full">
                                            <option value="" hidden>Seleccionar Estudiante Evaluador</option>
                                            <option value="1" className="bg-white text-black border-2 border--[#32569A] rounded-md">Amadeo Siles</option>
                                            <option value="2" className="bg-white text-black border-2 border--[#32569A] rounded-md">Alejandra Cabezas</option>
                                        </select>    
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Edicion</button>
                                        </td>
                                    </tr>
                                    <tr className="bg-[#e1d7b7] text-black">
                                        <td className="py-2 px-4 border border-solid border-black">1</td>
                                        <td className="py-2 px-4 border border-solid border-black">jhonn Siles</td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                        <select className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full">
                                            <option value="" hidden>Seleccionar Estudiante Evaluador</option>
                                            <option value="1" className="bg-white text-black border-2 border--[#32569A] rounded-md">Amadeo Siles</option>
                                            <option value="2" className="bg-white text-black border-2 border--[#32569A] rounded-md">Alejandra Cabezas</option>
                                        </select>    
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Edicion</button>
                                        </td>
                                    </tr>
                                    <tr className="bg-[#e1d7b7] text-black">
                                        <td className="py-2 px-4 border border-solid border-black">1</td>
                                        <td className="py-2 px-4 border border-solid border-black">Jorge Paredes</td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                        <select className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full">
                                            <option value="" hidden>Seleccionar Estudiante Evaluador</option>
                                            <option value="1" className="bg-white text-black border-2 border--[#32569A] rounded-md">Amadeo Siles</option>
                                            <option value="2" className="bg-white text-black border-2 border--[#32569A] rounded-md">Alejandra Cabezas</option>
                                        </select>    
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Edicion</button>
                                        </td>
                                    </tr>
                                    <tr className="bg-[#e1d7b7] text-black">
                                        <td className="py-2 px-4 border border-solid border-black">1</td>
                                        <td className="py-2 px-4 border border-solid border-black">Lucas Rojas</td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                        <select className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full">
                                            <option value="" hidden>Seleccionar Estudiante Evaluador</option>
                                            <option value="1" className="bg-white text-black border-2 border--[#32569A] rounded-md">Amadeo Siles</option>
                                            <option value="2" className="bg-white text-black border-2 border--[#32569A] rounded-md">Alejandra Cabezas</option>
                                        </select>    
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Edicion</button>
                                        </td>
                                    </tr>
                                    <tr className="bg-[#e1d7b7] text-black">
                                        <td className="py-2 px-4 border border-solid border-black">1</td>
                                        <td className="py-2 px-4 border border-solid border-black">Marcos Lopez</td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                        <select className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full">
                                            <option value="" hidden>Seleccionar Estudiante Evaluador</option>
                                            <option value="1" className="bg-white text-black border-2 border--[#32569A] rounded-md">Amadeo Siles</option>
                                            <option value="2" className="bg-white text-black border-2 border--[#32569A] rounded-md">Alejandra Cabezas</option>
                                        </select>    
                                        </td>
                                        <td className="py-2 px-4 border border-solid border-black">
                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Edicion</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2 className="text-3xl font-bold text-[#32569A] r mb-4">Agregar Criterios de Evaluacion</h2>
                            <textarea
                                className="mt-2 w-1/2 px-4 py-2 bg-white border border-[#32569A] rounded"
                                rows="4"
                                placeholder="Agregar criterios de evaluación..."
                                value={criterios}
                                onChange={(e) => setCriterios(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Copyright />
        </>
    );
}
