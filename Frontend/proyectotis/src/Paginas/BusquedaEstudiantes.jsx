import React from 'react';
import { useUser } from "../Componentes/UserContext"; // Asegúrate de que la ruta sea correcta
import Navbar from "../Componentes/NavbarInicio"; // Verifica el nombre del archivo
import BarraLateral from "../Componentes/BarraLateralAdministrador"; // Asegúrate de que la ruta y nombre sean correctos
import BarraCopyright from "../Componentes/BarraCopyright";

const BusquedaEstudiantes = () => {
  return (
    <>
      <Navbar /> {/* Componente de navegación */}
      <div className="bg-custom-bg flex" style={{ height: '100vh', marginTop: '70px' }}>
        <BarraLateral /> {/* Componente de la barra lateral */}
      </div>
      <BarraCopyright />
    </>
  );    
}

export default BusquedaEstudiantes;