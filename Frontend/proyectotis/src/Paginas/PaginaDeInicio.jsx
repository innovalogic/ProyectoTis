import React from 'react';
import NavbarInicioDeSesion from "../Componentes/NavBarInicioDeSesion";


export default function PaginaDeInicio() {
    return (
      <div>
        <NavbarInicioDeSesion />
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          ¡Bienvenido a la Página de Inicio!
        </h1>
        <p className="text-lg text-gray-700">Esta es la página principal de tu aplicación.</p>
      </div>
      </div>
      
    );
  }