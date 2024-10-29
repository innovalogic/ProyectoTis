import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralEstudiante";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";

export default function PerfilEstudiante() {
    return (
        <>
            <NavbarInicioDeSesion />
            <div className="bg-custom-bg flex" style={{ height: '100vh', marginTop: '70px' }}>
                <BarraLateral />
                <div className="flex justify-center items-center w-full mt-[-100px]">
                    <div className="bg-[#1E3664] rounded-[75px] p-12 text-white w-[98%] md:w-[90%] lg:w-[80%] h-[70vh] shadow-2xl flex flex-col">
                        <h2 className="text-center font-bold text-3xl">PERFIL ESTUDIANTE</h2>
                        {/* Contenido del recuadro aquí */}
                    </div>
                </div>
            </div>
            <BarraCopyright />
        </>
    );
}
