import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';

export default function RegistroEvFinalGrupo() {

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="flex h-full w-screen mt-[70px] bg-[#32569A]">
                <BarraLateralDocente />
                <div className="w-screen bg-[#efe7dc] p-4">
                    <h1 className="text-4xl font-bold text-[#32569A] text-center mb-4">Registrar Evaluaciones Semanales</h1>
                    <select
                        className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-1/2" // Ancho fijo de 20rem
                        // className="px-4 py-2 bg-[#32569A] text-white border border-[#32569A] rounded w-full" // Ancho completo
                    >
                        <option value="" hidden>Seleccionar Tipo Evaluacion</option>
                        <option value="Cruzada" className="bg-white text-black border-2 border--[#32569A] rounded-md">Evaluacion 1: Cruzada</option>
                        <option value="Cruzada" className="bg-white text-black border-2 border--[#32569A] rounded-md">Evaluacion 2: AutoEvaluacion</option>
                        <option value="Cruzada" className="bg-white text-black border-2 border--[#32569A] rounded-md">Evaluacion 3: Pares</option>
                    </select>
                </div>
            </div>
            <Copyright />
        </>
    );
}
