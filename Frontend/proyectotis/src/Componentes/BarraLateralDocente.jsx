import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useUser } from "../Componentes/UserContext";

export default function BarraLateral({ onCollapseChange }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user, setUser } = useUser();
    if (!user || !user.idEstudiante) {
        return <Navigate to="/" replace />; // Redirige a la página de login
      }

    const handleLogout = () => {
        setUser(null);
        alert('Has cerrado sesión.');
    };

    const toggleCollapse = () => {
        const newCollapsedState = !collapsed;
        setCollapsed(newCollapsedState);
        onCollapseChange(newCollapsedState); // Llamar a la función para notificar el cambio
    };

    return (
        <div className="flex" style={{ height: '100vh' }}>
            <Sidebar
                collapsed={collapsed}
                className="bg-[#32569A] text-white transition-all duration-300 ease-in-out"
                style={{
                    width: collapsed ? '80px' : '250px',
                    height: '100vh', // Asegúrate de que tenga toda la altura de la pantalla
                    overflowY: 'auto', // Permite el desplazamiento si el contenido excede la altura
                }}
            >
                <div className="flex flex-col bg-[#32569A]" style={{ height: '100vh' }}>
                    <div className="flex items-center justify-between p-4">
                        <h1 className={`${collapsed ? 'hidden' : 'block'} text-[#EFE7DC] font-bold text-2xl`}>
                            Menú
                        </h1>
                        <button
                            onClick={toggleCollapse}
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
                        <img src="/src/Imagenes/docente.png" alt="Logo" className="w-32 h-auto inline-block" />
                    </div>

                    <h1 className={`${collapsed ? 'hidden' : 'block'} text-[#EFE7DC] font-bold text-2xl text-center p-2 mt-4`}>
                        Docente
                    </h1>
                    {!collapsed && user && (
                        <h3 className="text-[#EFE7DC] text-center font-medium mt-2">
                            {user.nombreDocente + " " + user.apellidoDocente}
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
                            icon={<img src="/src/Imagenes/Inicio.png" alt="Inicio" className="w-8 h-8 inline-block" />}
                            component={<Link to="/InicioDocente" />}
                        >
                            Inicio
                        </MenuItem>

                        <SubMenu
                            label="Evaluacion"
                            className="text-[#EFE7DC] font-bold"
                            icon={<img src="/src/Imagenes/Test.png" alt="Evaluaciones" className="w-8 h-8 inline-block" />}
                        >
                            <MenuItem className="text-[#EFE7DC] font-bold" component={<Link to="/RegistroEvSemanales" />}>
                                Evaluacion Semanal
                            </MenuItem>
                            <MenuItem className="text-[#EFE7DC] font-bold" component={<Link to="/RegistroEvFinal" />}>
                                Evaluacion Final
                            </MenuItem>
                            <MenuItem className="text-[#EFE7DC] font-bold" component={<Link to="/AñadirCriterios" />}>
                                Añadir criterios
                            </MenuItem>
                        </SubMenu>
                        <MenuItem
                            className="text-[#EFE7DC] font-bold"
                            icon={<img src="/src/Imagenes/Grupo.png" alt="Calendario" className="w-8 h-8 inline-block" />}
                            component={<Link to="/RecuperarEvaluacion" />}
                        >
                            Evaluaciones Pasadas
                        </MenuItem>

                        {/* Opción de Perfil */}
                        <MenuItem
                            className="text-[#EFE7DC] font-bold"
                            icon={<img src="/src/Imagenes/docente.png" alt="PerfilDocente" className="w-8 h-8 inline-block" />}
                            component={<Link to="/PerfilDocente" />}
                        >
                            Perfil
                        </MenuItem>
                        <MenuItem
                            className="text-[#EFE7DC] font-bold"
                            icon={<img src="/src/Imagenes/estudiante.png" alt="Estudiantes" className="w-8 h-8 inline-block" />}
                            component={<Link to="/BusquedaEstudiantesDoc" />}
                        >
                            Estudiantes
                        </MenuItem>

                        <div className="mt-auto">
                            <MenuItem
                                className="text-[#EFE7DC] font-bold"
                                onClick={handleLogout}
                                icon={<img src="/src/Imagenes/Logout.png" alt="Cerrar sesión" className="w-8 h-8 inline-block" />}
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
