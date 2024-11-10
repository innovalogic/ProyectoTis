import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralAdministrador";
import Navbar from "../Componentes/NavbarInicio";
import { useLocation } from "react-router-dom";
export default function AdministradorEstudiante() {
  const location = useLocation();
  const { nombreEstudiante, apellidoEstudiante, codSis, telefonoEstudiante, contraseñaEstudiante, idGrupoEmpresa, emailEstudiante } = location.state?.data || {};
  const perfil = {nombre: nombreEstudiante,
    apellido: apellidoEstudiante,
    codigo:codSis,
    telefono:telefonoEstudiante,
    contraseña:contraseñaEstudiante,
    grupo:idGrupoEmpresa,
    email:emailEstudiante}
    return (
        <>
          <Navbar /> {/* Componente de navegación */}
          <div className="bg-custom-bg flex" style={{ height: '100vh', marginTop: '70px' }}>
            <BarraLateral /> {/* Componente de la barra lateral */}
            <div className="flex justify-center items-center w-full mt-[-100px]">
              <div className="bg-[#1E3664] rounded-[75px] p-12 text-white w-[98%] md:w-[90%] lg:w-[80%] h-[70vh] shadow-2xl flex flex-col lg:flex-row justify-between relative">
                <h2 className="font-bold text-3xl absolute left-1/2 transform -translate-x-1/2 top-8">PERFIL ESTUDIANTE</h2>
                <div className="flex flex-col items-center justify-center w-full lg:w-auto mt-16 lg:mt-0">
                  <div className="flex flex-col ml-6 lg:ml-0">
                    <div className="mb-4 text-2xl font-bold">NOMBRE: <span className="font-light ml-2">{perfil.nombre}</span></div>
                    <div className="mb-4 text-2xl font-bold">APELLIDO: <span className="font-light ml-2">{perfil.apellido}</span></div>
                    <div className="mb-4 text-2xl font-bold">CODSIS: <span className="font-light ml-2">{perfil.codigo}</span></div>
                    <div className="mb-4 text-2xl font-bold">TELEFONO: <span className="font-light ml-2">{perfil.telefono}</span></div>
                    <div className="mb-4 text-2xl font-bold">CORREO: <span className="font-light ml-2">{perfil.email}</span></div>
                    <div className="mb-4 text-2xl font-bold">CONTRASEÑA: <span className="font-light ml-2">{perfil.contraseña}</span></div>
                    <div className="mb-4 text-2xl font-bold">GRUPO EMPRESA : <span className="font-light ml-2">{perfil.grupo}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BarraCopyright />
        </>
      );
}
