import React from 'react';
import { useLocation } from 'react-router-dom';

const NavbarInicioDeSesion = () => {
  const location = useLocation();

  // Lista de rutas donde los botones deben desaparecer
  const hiddenButtonsRoutes = ['/InicioEstudiante', '/Dashboard', '/PerfilEstudiante'];

  // Verificamos si la ruta actual está en la lista de rutas
  const shouldHideButtons = hiddenButtonsRoutes.includes(location.pathname);

  return (
    <nav className="bg-[#32569A] p-2 w-full fixed top-0 left-0 z-10">
      <div className="flex justify-between items-center pl-0 pr-20">
        {/* Imagen con bordes redondos y texto al lado */}
        <div className="flex items-center space-x-4">
          <img src="src/Imagenes/LogoUniversidad.jpg" alt="LogoUniversidad" className="h-12 rounded-xl" />
          <div>
            <span className="text-2xl font-bold text-custom-bg">PROYECTRACK</span>
            <br />
            <span className="text-sm font-bold text-custom-bg">
              By 
              <img 
                src="src/Imagenes/Logo.PNG" 
                alt="InnovalogicLogo" 
                className="inline-block h-4 w-4 mx-2" 
              /> 
              INNOVALOGIC
            </span>
          </div>
        </div>

        {/* Solo mostramos los botones si la ruta actual no está en hiddenButtonsRoutes */}
        {!shouldHideButtons && (
          <div className="flex justify-end items-center space-x-8">
            <a href="RegistroEstudiante" className="text-custom-bg hover:underline text-xl">Registrarse</a>
            <a href="InicioSesion" className="text-custom-bg hover:underline text-xl">Iniciar Sesión</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarInicioDeSesion;
