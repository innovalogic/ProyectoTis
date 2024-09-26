import React from 'react';
import LogoUniversidad from "../Imagenes/LogoUniversidad.jpg"

export const Encabezado = () => {
  return (
    <nav className="Encabezado">
      <div className="flex justify-between items-center pl-0 pr-20">
        <div className="flex items-center space-x-4">
          <img src={LogoUniversidad} className="h-12 rounded-xl" />
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
      </div>
    </nav>
  );
};