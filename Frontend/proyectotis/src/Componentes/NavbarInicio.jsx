import React from 'react';

const NavbarInicioDeSesion = () => {
  return (
    <nav className="bg-[#32569A] p-6 w-full">
      <div className="flex justify-end items-center pr-20">
        <a href="#register" className="text-white hover:underline text-xl mr-8">Registrarse</a>
        <a href="#login" className="text-white hover:underline text-xl">Iniciar Sesión</a>
      </div>
    </nav>
  );
};

export default NavbarInicioDeSesion;