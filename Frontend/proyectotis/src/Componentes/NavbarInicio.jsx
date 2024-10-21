import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

const NavbarInicioDeSesion = () => {
  const location = useLocation(); // Obtener la ubicación actual

  // Definir las rutas donde no se deben mostrar los enlaces de "Registrarse" e "Iniciar Sesión"
  const hideLinksOnRoutes = ['/InicioEstudiante', '/registroEmpresa','/PlanificacionGe']; // Añade más rutas si es necesario

  // Verifica si la ruta actual está en la lista de rutas donde ocultar los enlaces
  const shouldHideLinks = hideLinksOnRoutes.includes(location.pathname);

  return (
    <nav className="bg-[#32569A] p-2 w-full fixed top-0 left-0 z-10">
      <div className="flex justify-between items-center pl-0 pr-20">
        {/* Imagen con bordef 
        s redondos y texto al lado */}
        <div className="flex items-center space-x-4">
          <img src="/Imagenes/LogoUniversidad.jpg" alt="LogoUniversidad" className="h-12 rounded-xl" />
          <div>
            <span className="text-2xl font-bold text-custom-bg">PROYECTRACK</span>
            <br />
            <span className="text-sm font-bold text-custom-bg">
              By 
              <img 
                src="/Imagenes/Logo.PNG" 
                alt="InnovalogicLogo" 
                className="inline-block h-4 w-4 mx-2" 
              /> 
              INNOVALOGIC
            </span>
          </div>
   
        </div>

        {/* Menú de registro e iniciar sesión */}
        {!shouldHideLinks && ( // Condicional para ocultar los enlaces en las páginas especificadas
          <div className="flex justify-end items-center space-x-8">
            {/* Enlace absoluto para "Registrarse" */}
            <NavLink 
              to="/RegistroEstudiante"  // Asegúrate de que la ruta es absoluta
              className="text-custom-bg hover:bg-[#1E3664] hover:text-white p-2 rounded-lg text-xl no-underline transition duration-300"
            >
              Registrarse
            </NavLink>

            {/* Dropdown para Iniciar Sesión con rutas absolutas */}
            <NavDropdown 
              title={<span className="text-xl no-underline hover:bg-[#1E3664] hover:text-white p-2 rounded-lg transition duration-300">Iniciar Sesión</span>} 
              id="basic-nav-dropdown" 
              className="text-custom-bg no-underline"
            >
              <NavDropdown.Item as={NavLink} to="/InicioSesionEstudiante" className="nav-link">
                Estudiante
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/InicioSesionDocente" className="nav-link">
                Docente
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarInicioDeSesion;
