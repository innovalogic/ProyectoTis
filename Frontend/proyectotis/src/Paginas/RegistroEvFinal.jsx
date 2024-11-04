import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';
import CardEmpresa from '../Componentes/CardEmpresa';

export default function RegistroEvFinal() {

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="flex h-full w-screen mt-[70px] bg-[#32569A]">
                <BarraLateralDocente />
                <div className="w-screen bg-[#efe7dc] p-4">
                    <h1 className="text-4xl font-bold text-[#32569A] text-center mb-4">Registrar Evaluaciones Semanales</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                        <CardEmpresa nombreEmpresa="Innovalogic" logoUrl="" />
                        <CardEmpresa nombreEmpresa="Error 404" logoUrl="" />
                        <CardEmpresa nombreEmpresa="DEVLOGIC" logoUrl="" />
                        <CardEmpresa nombreEmpresa="CodeFast" logoUrl="" />
                        <CardEmpresa nombreEmpresa="DEVFAST" logoUrl="" />
                        <CardEmpresa nombreEmpresa="Hacktechnology" logoUrl="" />
                        <CardEmpresa nombreEmpresa="Innovawork" logoUrl="" />
                    </div>
                </div>
            </div>
            <Copyright />
        </>
    );
}
