import React from 'react';

const NavbarInicioDeSesion = () => {
  return (
    <nav className="bg-[#32569A] p-4 w-full">
      <div className="flex justify-start space-x-4">
        <a href="#register" className="text-white hover:underline">Registrarse</a>
        <a href="#login" className="text-white hover:underline">Iniciar Sesión</a>
      </div>
    </nav>
  );
};

export default NavbarInicioDeSesion;