import React from 'react';
import { useUser } from "../Componentes/UserContext"; // Asegúrate de que la ruta sea correcta
import Navbar from "../Componentes/NavbarInicio"; // Verifica el nombre del archivo
import BarraLateral from "../Componentes/BarraLateralDocente"; // Asegúrate de que la ruta y nombre sean correctos
import BarraCopyright from "../Componentes/BarraCopyright";

const PerfilDocente = () => {
  const { user } = useUser();

  return (
    <>
      <Navbar /> {/* Componente de navegación */}
      <div className="bg-custom-bg flex" style={{ height: '100vh', marginTop: '70px' }}>
        <BarraLateral /> {/* Componente de la barra lateral */}
        <div className="flex justify-center items-center w-full mt-[-100px]">
          <div className="bg-[#1E3664] rounded-[75px] p-12 text-white w-[98%] md:w-[90%] lg:w-[80%] h-[70vh] shadow-2xl flex flex-col">
            <h2 className="text-center font-bold text-3xl">PERFIL DOCENTE</h2>
            <div className="flex flex-col mt-6 ml-24 pt-8">
              <div className="mb-4 text-2xl font-bold">NOMBRE: <span className="font-light ml-2">{user.nombreDocente}</span></div>
              <div className="mb-4 text-2xl font-bold">APELLIDO: <span className="font-light ml-2">{user.apellidoDocente}</span></div>
              <div className="mb-4 text-2xl font-bold">TELEFONO: <span className="font-light ml-2">{user.telefonoDocente}</span></div>
              <div className="mb-4 text-2xl font-bold">CORREO: <span className="font-light ml-2">{user.correoDocente}</span></div>
              <div className="mb-4 text-2xl font-bold">CODIGO DOCENTE: <span className="font-light ml-2">{user.CodigoDocente}</span></div>
            </div>
          </div>
        </div>
      </div>
      <BarraCopyright />
    </>
  );    
}

export default PerfilDocente;