import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';

export default function RegistroEvSemanales() {
    return (
        <>
            <NavbarInicioDeSesion />
            <div className="flex h-full w-screen mt-[70px] bg-[#32569A]">
                <BarraLateralDocente />
                <div className="w-screen bg-[#efe7dc] p-4">
                    <h1 className="text-4xl font-bold text-[#32569A] text-center mb-4">Registrar Evaluaciones Semanales</h1>
                    <select className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded">
                        <option value="" hidden>Seleccionar Grupo</option>
                        <option value="grupo1" className="bg-white text-black border-2 border--[#32569A] rounded-md">Grupo 1 INOVALOGIC</option>
                        <option value="grupo2" className="bg-white text-black border-2 border--[#32569A] rounded-md">Grupo 2 DevCompany</option>
                    </select>
                    <select className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded">
                        <option value="" hidden>Seleccionar Sprint</option>
                        <option value="sprint1" className="bg-white text-black border-2 border--[#32569A] rounded-md">Sprint 1</option>
                        <option value="sprint2" className="bg-white text-black border-2 border--[#32569A] rounded-md">Sprint 2</option>
                    </select>
                    <select className="flex-1 px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded">
                        <option value="" hidden>Seleccionar Semana</option>
                        <option value="semana1" className="bg-white text-black border-2 border--[#32569A] rounded-md">Semana 1</option>
                        <option value="semana2" className="bg-white text-black border-2 border--[#32569A] rounded-md">Semana 2</option>
                        <option value="semana3" className="bg-white text-black border-2 border--[#32569A] rounded-md">Semana 3</option>
                        <option value="semana4" className="bg-white text-black border-2 border--[#32569A] rounded-md">Semana 4</option>
                    </select>
                    <div className="flex justify-between mt-10 -mb-4 ml-4 mr-4 relative ">
                        <div className="w-1/3 p-2 bg-[#32569A] text-white border border-[#32569A] rounded ">Grupo Empresa: Innovalogic Sprint:1 Semana:1 </div>
                        <div className="w-1/3 p-2 bg-[#32569A] text-white border border-[#32569A] rounded ">Fecha Inicio:01/09/24 - Fecha Fin:07/09/24</div>
                    </div>
                    <div className="bg-[#e1d7b7] border-4 border-[#32569A] rounded-lg p-4">
                        <table className="min-w-full bg-[#e1d7b7] border-collapse rounded-lg ">
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
                                    <th className="py-2 px-4 border border-solid border-black">Edicion</th>
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
                                <tr className="bg-white text-black">
                                    <td className="py-2 px-4 border border-solid border-black">Semana 1</td>
                                    <td className="py-2 px-4 border border-solid border-black">María López</td>
                                    <td className="py-2 px-4 border border-solid border-black">HU02</td>
                                    <td className="py-2 px-4 border border-solid border-black">Tarea B</td>
                                    <td className="py-2 px-4 border border-solid border-black">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Links</button>
                                    </td>
                                    <td className="py-2 px-4 border border-solid border-black">Pendiente</td>
                                    <td className="py-2 px-4 border border-solid border-black">60/100</td>
                                    <td className="py-2 px-4 border border-solid border-black">Requiere mejora</td>
                                    <td className="py-2 px-4 border border-solid border-black">
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Editar</button>
                                    </td>
                                </tr>
                                <tr className="bg-white text-black">
                                    <td className="py-2 px-4 border border-solid border-black">Semana 1</td>
                                    <td className="py-2 px-4 border border-solid border-black">Carlos Fernández</td>
                                    <td className="py-2 px-4 border border-solid border-black">HU03</td>
                                    <td className="py-2 px-4 border border-solid border-black">Tarea C</td>
                                    <td className="py-2 px-4 border border-solid border-black">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Links</button>
                                    </td>
                                    <td className="py-2 px-4 border border-solid border-black">Completado</td>
                                    <td className="py-2 px-4 border border-solid border-black">90/100</td>
                                    <td className="py-2 px-4 border border-solid border-black">Excelente trabajo</td>
                                    <td className="py-2 px-4 border border-solid border-black">
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Editar</button>
                                    </td>
                                </tr>
                                <tr className="bg-white text-black">
                                    <td className="py-2 px-4 border border-solid border-black">Semana 1</td>
                                    <td className="py-2 px-4 border border-solid border-black">Ana Torres</td>
                                    <td className="py-2 px-4 border border-solid border-black">HU04</td>
                                    <td className="py-2 px-4 border border-solid border-black">Tarea D</td>
                                    <td className="py-2 px-4 border border-solid border-black">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Links</button>
                                    </td>
                                    <td className="py-2 px-4 border border-solid border-black">Completado</td>
                                    <td className="py-2 px-4 border border-solid border-black">95/100</td>
                                    <td className="py-2 px-4 border border-solid border-black">Excelente trabajo</td>
                                    <td className="py-2 px-4 border border-solid border-black">
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Editar</button>
                                    </td>
                                </tr>
                                <tr className="bg-white text-black">
                                    <td className="py-2 px-4 border border-solid border-black">Semana 1</td>
                                    <td className="py-2 px-4 border border-solid border-black">Pablo Torres</td>
                                    <td className="py-2 px-4 border border-solid border-black">HU04</td>
                                    <td className="py-2 px-4 border border-solid border-black">Tarea D</td>
                                    <td className="py-2 px-4 border border-solid border-black">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Links</button>
                                    </td>
                                    <td className="py-2 px-4 border border-solid border-black">Completado</td>
                                    <td className="py-2 px-4 border border-solid border-black">95/100</td>
                                    <td className="py-2 px-4 border border-solid border-black">Excelente trabajo</td>
                                    <td className="py-2 px-4 border border-solid border-black">
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Editar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Copyright />
        </>
    );
}
