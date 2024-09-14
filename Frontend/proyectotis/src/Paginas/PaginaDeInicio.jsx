import React from 'react';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";

export default function PaginaDeInicio() {
    return (
      <div className="bg-custom-bg overflow-hidden min-h-screen">
        <NavbarInicioDeSesion />
        {/* Imagen debajo del Navbar */}
        <img 
          src="/src/Imagenes/M1.jpg" 
          alt="Paisaje" 
          className="w-full h-[355px] mx-auto"
        />
      </div>
    );
}