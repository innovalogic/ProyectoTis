import React from 'react';
import { Sidebar, Menu, MenuItem,SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function BarraLateral(){
    
    const [collapsed, setCollapsed] = useState(false);
    
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
                                src="/src/Imagenes/Barra.png"
                                alt={collapsed ? 'Expandir' : 'Colapsar'}
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <img src="/src/Imagenes/Estudiante.png" alt="Logo" className="w-16 h-16 inline-block" />
                    </div>

                    <h1 className={`${collapsed ? 'hidden' : 'block'} text-[#EFE7DC] font-bold text-2xl text-center p-2 mt-4`}>Estudiante</h1>

            <Menu
                menuItemStyles={{
                    button: {
                        backgroundColor: '#32569A',
                        color: 'white',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease',
                        [`&:hover`]: {
                            backgroundColor: '#1F3A75', 
                            color: 'white',  
                        },
                        [`&.active`]: {
                            backgroundColor: '#1E3664',
                        },
                    },
                }}
            >
                <MenuItem
                    className="text-[#EFE7DC] font-bold"
                    icon={<img src="/src/Imagenes/Inicio.png" alt="Inicio" className="w-8 h-8 inline-block" />}
                    component={<Link to="InicioEstudiante" />}
                >
                    Inicio
                </MenuItem>

                <MenuItem
                    className="text-[#EFE7DC] font-bold"
                    icon={<img src="/src/Imagenes/Test.png" alt="Evaluaciones" className="w-8 h-8 inline-block" />}
                    component={<Link to="/calendar" />}
                >
                    Evaluaciones
                </MenuItem>

                <MenuItem
                    className="text-[#EFE7DC] font-bold"
                    icon={<img src="/src/Imagenes/Calendar.png" alt="Calendario" className="w-8 h-8 inline-block" />}
                    component={<Link to="/e-commerce" />}
                >
                    Calendario
                </MenuItem>

                <SubMenu
                    title="Empresa"
                    className="bg-[#32569A] text-[#EFE7DC] font-bold"
                    style={{ backgroundColor: '#32569A', color: '[#EFE7DC]' }}
                    icon={<img src="/src/Imagenes/Grupo.png" alt="Empresa" className="w-8 h-8 inline-block" />}
                >
                    <MenuItem className="text-white font-bold" component={<Link to="/RegistroEmpresa" />}>
                        Registrar
                    </MenuItem>
                    <MenuItem className="text-[#EFE7DC] font-bold" component={<Link to="/Empresa/Planificacion" />}>
                        Planificación
                    </MenuItem>
                    <MenuItem className="text-[#EFE7DC] font-bold" component={<Link to="/empresa/contact" />}>
                        Información
                    </MenuItem>
                </SubMenu>

                <div className="mt-auto">
                    <MenuItem
                        className="text-[#EFE7DC] font-bold"
                        onClick={() => alert('Has cerrado sesión.')}
                        icon={<img src="/src/Imagenes/Logout.png" alt="Cerrar sesión" className="w-8 h-8 inline-block" />}
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