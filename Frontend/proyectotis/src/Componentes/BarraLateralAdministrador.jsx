import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from "../Componentes/UserContext";

export default function BarraLateral() {
    const [collapsed, setCollapsed] = useState(false);
    const { user, setUser } = useUser(); // Añadir setUser para poder actualizar el usuario
    if (!user || !user.correo) {
        return <Navigate to="/" replace />; // Redirige a la página de login
      }

    const handleLogout = () => {
        setUser(null); // Borra el contexto de usuario
        alert('Has cerrado sesión.');
    };

    return (
        <div className="flex h-[calc(100vh)]">
            <Sidebar
                collapsed={collapsed}
                className="bg-[#32569A] text-white transition-all duration-300 ease-in-out"
                style={{ width: collapsed ? '80px' : '250px', height: '100vh' }}
            >
                <div className="flex flex-col h-full bg-[#32569A]">
                    <div className="flex items-center justify-between p-4">
                        <h1 className={`${collapsed ? 'hidden' : 'block'} text-[#EFE7DC] font-bold text-2xl`}>Menú</h1>
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="bg-[#32569A] text-[#EFE7DC] p-2 rounded flex items-center justify-center"
                        >
                            <img
                                src="/Imagenes/Barra.png"
                                alt={collapsed ? 'Expandir' : 'Colapsar'}
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <img src="/Imagenes/Admin.png" alt="Logo" className="w-32 h-auto inline-block" />
                    </div>

                    <h1 className={`${collapsed ? 'hidden' : 'block'} text-[#EFE7DC] font-bold text-2xl text-center p-2 mt-4`}>ADMINISTRADOR</h1>
                    {!collapsed && user && (
                        <h3 className="text-[#EFE7DC] text-center font-medium mt-2">
                            {user.nombre}
                        </h3>
                    )}
                    

                    <Menu
                        menuItemStyles={{
                            button: {
                                backgroundColor: '#32569A',
                                color: 'white',
                                fontWeight: 'bold',
                                transition: 'background-color 0.3s ease',
                                [`&:hover`]: {
                                    backgroundColor: '#1F3A75',
                                    color: '#efe7dc',
                                },
                                [`&.active`]: {
                                    backgroundColor: '#1E3664',
                                },
                            },
                        }}
                    >
                        <MenuItem
                            className="text-[#EFE7DC] font-bold"
                            icon={<img src="/Imagenes/Inicio.png" alt="Inicio" className="w-8 h-8 inline-block" />}
                            component={<Link to="/InicioAdministrador" />}
                        >
                            Inicio
                        </MenuItem>


                        <MenuItem
                            className="text-[#EFE7DC] font-bold"
                            icon={<img src="/Imagenes/estudiante.png" alt="Estudiantes" className="w-8 h-8 inline-block" />}
                            component={<Link to="/BusquedaEstudiantes" />}
                        >
                            Estudiantes
                        </MenuItem>


                        <MenuItem
                            className="text-[#EFE7DC] font-bold"
                            icon={<img src="/Imagenes/docente.png" alt="Docentes" className="w-8 h-8 inline-block" />}
                            component={<Link to="/BusquedaDocentes" />}
                        >
                            Docentes
                        </MenuItem>


                        <MenuItem
                            className="text-[#EFE7DC] font-bold"
                            icon={<img src="/Imagenes/mas.png" alt="Registrar Docente" className="w-8 h-8 inline-block" />}
                            component={<Link to="/RegistroDocente" />}
                        >
                            Registrar Docente
                        </MenuItem>

                        <div className="mt-auto">
                            <MenuItem
                                className="text-[#EFE7DC] font-bold"
                                onClick={handleLogout} // Llama a la función de cierre de sesión
                                icon={<img src="/Imagenes/Logout.png" alt="Cerrar sesión" className="w-8 h-8 inline-block" />}
                                component={<Link to="/" />}
                            >
                                Cerrar sesión
                            </MenuItem>
                        </div>
                    </Menu>
                </div>
            </Sidebar>
        </div>
    );
}
