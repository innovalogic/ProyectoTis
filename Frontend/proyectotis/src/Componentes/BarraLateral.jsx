import React from 'react';
import { Sidebar, Menu, MenuItem,SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function BarraLateral(){
    
    const [collapsed, setCollapsed] = useState(false);
    
    return (
            <div style={{ display: 'flex', height: '100%', backgroundColor: '#32569A' }}>
            <Sidebar
                collapsed={collapsed}
                className="bg-[#32569A] text-white shadow-lg transition-all duration-300 ease-in-out"
                style={{ width: collapsed ? '80px' : '250px', height: '100%' }} 
            >
                <div className = {`bg-[#32569A]`}>
                <div className ="flex items-center justify-between p-4">
                    <h1 className ={`${collapsed ? 'hidden' : 'block'} text-white font-bold text-2xl`}>Menú</h1>
                    <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="bg-[#32569A] text-white p-2 rounded flex items-center justify-center"
                    >
                    <img
                        src="/src/Imagenes/Barra.png"
                        alt={collapsed ? 'Expandir' : 'Colapsar'}
                        className="w-6 h-6"
                    />
                    </button>
            </div>
                <div className="text-center" style={{marginTop: '15px' }}>
                <img src="/src/Imagenes/Estudiante.png" alt="Logo" className="w-16 h-16 inline-block" />
                </div>
            </div>
            <h1 className={`${collapsed ? 'hidden' : 'block'} text-white font-bold text-2xl bg-[#32569A] text-center p-2`}>Estudiante</h1>

            <Menu
            menuItemStyles={{
                button: {
                backgroundColor: '#32569A',
                color: 'white',
                fontWeight: 'bold',
                [`&.active`]: {
                    backgroundColor: '#25467C',
                },
                },
            }}
            className="bg-[#32569A]"
            >
            <MenuItem
                className={`text-white font-bold`}
                icon={<img src="/src/Imagenes/Inicio.png" alt="Inicio" className="w-8 h-8 inline-block" />}
                component={<Link to="/InicioEstudiante" />}
            >
                Inicio
            </MenuItem>

            <MenuItem
                className={`text-white font-bold`}
                icon={<img src="/src/Imagenes/Test.png" alt="Evaluaciones" className="w-8 h-8 inline-block" />}
                component={<Link to="/calendar" />}
            >
                Evaluaciones
            </MenuItem>

            <MenuItem
                className={`text-white font-bold`}
                icon={<img src="/src/Imagenes/Calendar.png" alt="Calendario" className="w-8 h-8 inline-block" />}
                component={<Link to="/e-commerce" />}
            >
                Calendario
            </MenuItem>

            <SubMenu
                title="Empresa"
                className="bg-[#32569A] text-white font-bold"
                style={{ backgroundColor: '#32569A', color: 'white' }}
                icon={<img src="/src/Imagenes/Grupo.png" alt="Empresa" className="w-8 h-8 inline-block" />}
            >
                <MenuItem className="text-white font-bold" component={<Link to="/empresa/overview" />}>
                Registrar
                </MenuItem>
                <MenuItem className="text-white font-bold" component={<Link to="/empresa/departments" />}>
                Planificacion
                </MenuItem>
                <MenuItem className="text-white font-bold" component={<Link to="/empresa/contact" />}>
                Informacion
                </MenuItem>
            </SubMenu>
            <div className="mt-28">
            <MenuItem
            className="text-white font-bold"
            onClick={() => alert('Has cerrado sesión.')}
            icon={<img src="/src/Imagenes/Logout.png" alt="Cerrar sesión" className="w-8 h-8 inline-block" />}
            >
            Cerrar sesión
            </MenuItem>
        </div>
            </Menu>

        </Sidebar>
  </div>
    );
}
