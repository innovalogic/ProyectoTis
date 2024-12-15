import React, { useState, useEffect } from "react";
import { useUser } from "../Componentes/UserContext"; 
import Navbar from "../Componentes/NavbarInicio"; 
import BarraLateral from "../Componentes/BarraLateralDocente";
import BarraCopyright from "../Componentes/BarraCopyright";
import { useLocation } from "react-router-dom";

const VistaPerfilDo = () => {
    const location = useLocation();
    const {
        idEstudiante,
        nombreEstudiante,
        apellidoEstudiante,
        codSis,
        telefonoEstudiante,
        contraseñaEstudiante,
        idGrupoEmpresa,
        emailEstudiante,
        urlEstudiante,
      } = location.state?.data || {};
    
      // Estado para manejar el perfil y el modo de edición
      const [perfil, setPerfil] = useState({
        idEstudiante: idEstudiante,
        nombre: nombreEstudiante,
        apellido: apellidoEstudiante,
        codigoSis: codSis,
        telefono: telefonoEstudiante,
        contraseña: contraseñaEstudiante,
        grupo: idGrupoEmpresa,
        email: emailEstudiante,
        url:urlEstudiante
      });
  return (
    <>
      <Navbar />
      <div className="bg-custom-bg flex" style={{ height: 'calc(-110px + 100vh)', marginTop: '70px' }}>
        <BarraLateral />
        <div className="flex justify-center items-center w-full mt-[-100px]">
          <div className="bg-[#1E3664] rounded-[75px] p-12 text-white w-[98%] md:w-[90%] lg:w-[80%] h-[70vh] shadow-2xl flex flex-col lg:flex-row justify-between relative">
            <h2 className="font-bold text-3xl absolute left-1/2 transform -translate-x-1/2 top-8">PERFIL ESTUDIANTE</h2>
            <div className="flex flex-col items-center justify-center w-full lg:w-auto mt-16 lg:mt-0">
              <div className="flex flex-col ml-6 lg:ml-0">
              <div className="mb-4 text-2xl font-bold">NOMBRE: <span className="font-light ml-2">{perfil.nombre}</span></div>
              <div className="mb-4 text-2xl font-bold">APELLIDO: <span className="font-light ml-2">{perfil.apellido}</span></div>
              <div className="mb-4 text-2xl font-bold">CODSIS: <span className="font-light ml-2">{perfil.codigoSis}</span></div>
              <div className="mb-4 text-2xl font-bold">TELEFONO: <span className="font-light ml-2">{perfil.telefono}</span></div>
              <div className="mb-4 text-2xl font-bold">CORREO: <span className="font-light ml-2">{perfil.email}</span></div>
            </div>
            </div>
            <div className="flex flex-col items-center mt-8 lg:mt-0 relative" style={{ left: '-70px' }}>
              <div className="mt-28">
                <img 
                  src={perfil.url || 'default-image-url.jpg'} // En caso de que no haya imagen, muestra una por defecto
                  alt="Foto de perfil" 
                  className="w-40 h-40 object-cover shadow-lg mb-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BarraCopyright />
    </>
  );
}

export default VistaPerfilDo;
