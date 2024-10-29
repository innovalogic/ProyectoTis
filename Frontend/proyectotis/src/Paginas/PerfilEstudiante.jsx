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
                        <div className="flex flex-col mt-6 ml-24 pt-8"> {/* Añadir margen superior aquí */}
                            <p className="text-2xl font-bold">NOMBRE:</p>
                            <p className="text-2xl font-bold">APELLIDO:</p>
                            <p className="text-2xl font-bold">CODSIS:</p>
                            <p className="text-2xl font-bold">TELEFONO:</p>
                            <p className="text-2xl font-bold">CORREO:</p>
                        </div>
                    </div>
                </div>
            </div>
            <BarraCopyright />
        </>
    );
}
