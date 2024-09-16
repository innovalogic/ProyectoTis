import React from 'react';

const NavbarInicioDeSesion = () => {
  return (
    <nav className="bg-[#32569A] p-2 w-full">
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
              INNOVALOGIC</span>
          </div>
        </div>

        {/* Links de Iniciar Sesión y Registrarse */}
        <div className="flex justify-end items-center space-x-8">
          <a href="RegistroEstudiante" className="text-custom-bg hover:underline text-xl">Registrarse</a>
          <a href="#login" className="text-custom-bg hover:underline text-xl">Iniciar Sesión</a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarInicioDeSesion;