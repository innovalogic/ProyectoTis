import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from "./UserContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function BarraLateral() {
    const { setUser } = useUser();
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useUser();
    const [error, setError] = useState(null);
    const [isPlanificado, setIsPlanificado] = useState(false);
    const [evaluaciones, setEvaluaciones] = useState([]);
    const navigate = useNavigate();
    if (!user || !user.idEstudiante) {
        return <Navigate to="/" replace />; // Redirige a la página de login
      }

    const handleLogout = () => {
        setUser(null);
        alert('Has cerrado sesión.');
    };

    useEffect(() => {
        const fetchEvaluaciones = async () => {
            console.log("GrupoEmpresa ID: ", user.idGrupoEmpresa);  // Verificar si tiene el valor correcto
            try {
                const response = await axios.post('http://localhost/proyectotis/backend/obtenerEvaluacionFinal.php', {
                    grupoempresa_idgrupoempresa: user.idGrupoEmpresa,
                });
                console.log("Respuesta de la API:", response.data);  // Ver la respuesta de la API
                if (response.data.success) {
                    setEvaluaciones(response.data.evaluacionFinal);
                } else {
                    console.log('No se encontraron evaluaciones.');
                }
            } catch (error) {
                console.error('Error al obtener evaluaciones:', error.message);
            }
        };
    
        if (user.idGrupoEmpresa) {
            fetchEvaluaciones();
        }
    }, [user.idGrupoEmpresa]);

    const handleEvaluacionFinal = (tipoEvaluacion, idEvaluado) => {
        if (tipoEvaluacion === 3) {
            // Autoevaluación
            navigate('/Autoevaluacion');
        } else if (tipoEvaluacion === 2) {
            // Evaluación en pares
            navigate('/EvaluacionPares', { state: { idEvaluado } });
        } else if (tipoEvaluacion === 1) {
            // Evaluación cruzada
            navigate('/EvaluacionCruzada', { state: { idEvaluado } });
        }
    };

    const handleMenuClick = async () => {
        try {
            const responseEstudiantes = await axios.get('https://tis-0c3180bcccbd.herokuapp.com/ObtenerJefe.php', {
                params: { idEstudiante: user.idEstudiante },
            });
            console.log('Respuesta del servidor:', responseEstudiantes.data, user.idEstudiante);

            if (responseEstudiantes.data && responseEstudiantes.data.success && Array.isArray(responseEstudiantes.data.datos) && responseEstudiantes.data.datos.length > 0) {
                const grupoDatos = responseEstudiantes.data.datos[0];
                if (grupoDatos.idEstudianteScrum === user.idEstudiante) {
                    navigate('/RecuperarEvaluacionScrum', { state: { datosGrupo: grupoDatos } });
                } else {
                    navigate('/RecuperarEvaluacionMiembro');
                }
            } else {
                navigate('/RecuperarEvaluacionMiembro');
            }
        } catch (error) {
            console.error('Error al conectarse al servidor:', error.message);
        }
    };

    useEffect(() => {
        const fetchPlanificado = async () => {
            try {
                const response = await axios.post('https://tis-0c3180bcccbd.herokuapp.com/obtenerPlanificado.php', {
                    idGrupoEmpresa: user.idGrupoEmpresa,
                });
                console.log('Data:', response);
                if (response.data.success) {
                    const planificado = response.data.planificado[0].planificado;
                    setIsPlanificado(planificado === true);
                } else {
                    setError('No se pudo obtener el estado de planificado.');
                }
            } catch (error) {
                setError('Error al conectarse al servidor: ' + error.message);
                console.error(error);
            }
        };

        if (user.idGrupoEmpresa) {
            fetchPlanificado();
        }
    }, [user.idGrupoEmpresa]);

    return (
        <div className="flex" style={{ height: '100vh' }}>
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
                        <img src="/Imagenes/estudiante.png" alt="Logo" className="w-16 h-16 inline-block" />
                    </div>

                    <h1 className={`${collapsed ? 'hidden' : 'block'} text-[#EFE7DC] font-bold text-2xl text-center p-2 mt-4`}>Estudiante</h1>
                    {!collapsed && user && (
                        <h3 className="text-[#EFE7DC] text-center font-medium mt-2">{user.nombreEstudiante + " " + user.apellidoEstudiante}</h3>
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
                            icon={<img src="/Imagenes/Inicio.png" alt="Inicio" className="w-8 h-8 inline-block" />}
                            component={<Link to="/InicioEstudiante" />}
                        >
                            Inicio
                        </MenuItem>

                        <SubMenu
                            label="Evaluaciones"
                            className="bg-[#32569A] text-[#EFE7DC] font-bold"
                            icon={<img src="/Imagenes/Test.png" alt="Evaluaciones" className="w-8 h-8 inline-block" />}
                        >
                            <MenuItem className="text-white font-bold" onClick={handleMenuClick} >
                                Recuperar evaluaciones
                            </MenuItem>
                            <SubMenu
                                label="Evaluación Final"
                                className="bg-[#32569A] text-[#EFE7DC] font-bold"
                            >
                                {evaluaciones.slice(0, 1).map((evaluacion) => (
                                    <MenuItem
                                        key={evaluacion.idevaluacionfinal}
                                        className="text-[#EFE7DC] font-bold"
                                        onClick={() => handleEvaluacionFinal(evaluacion.tipoevaluacion_idtipoevaluacion, evaluacion.idevaluado)}
                                    >
                                        {evaluacion.tipoevaluacion_idtipoevaluacion === 1 && 'Evaluación Cruzada'}
                                        {evaluacion.tipoevaluacion_idtipoevaluacion === 2 && 'Evaluación en Pares'}
                                        {evaluacion.tipoevaluacion_idtipoevaluacion === 3 && 'Autoevaluación'}
                                    </MenuItem>
                                ))}
                            </SubMenu>
                            <MenuItem className="text-[#EFE7DC] font-bold" component={<Link to="/AvancesEstudiante" />}>
                                Avance
                            </MenuItem>
                        </SubMenu>

                        <MenuItem
                            className="text-[#EFE7DC] font-bold"
                            icon={<img src="/Imagenes/Calendar.png" alt="Calendario" className="w-8 h-8 inline-block" />}
                            component={<Link to="/InicioEstudiante" />}
                        >
                            Calendario
                        </MenuItem>

                        <SubMenu
                            label="Empresa"
                            className="bg-[#32569A] text-[#EFE7DC] font-bold"
                            style={{ backgroundColor: '#32569A', color: '[#EFE7DC]' }}
                            icon={<img src="/Imagenes/Grupo.png" alt="Empresa" className="w-8 h-8 inline-block" />}
                        >
                            {user.idGrupoEmpresa === null && (
                                <MenuItem className="text-white font-bold" component={<Link to="/RegistroEmpresa" />}>
                                    Registrar
                                </MenuItem>
                            )}
                            {user.idGrupoEmpresa !== null && (
                                <>
                                    <MenuItem className="text-[#EFE7DC] font-bold" 
                                    component={<Link to={isPlanificado ? "/SeguimientoSprints" : "/PlanificacionEstudiante"} />}>
                                        {isPlanificado ? "Seguimiento" : "Planificación"}
                                    </MenuItem>
                                    {/* Nueva opción "Avance" */}
                                    <MenuItem className="text-[#EFE7DC] font-bold" component={<Link to="/AvancesEstudiante" />}>
                                        Avance
                                    </MenuItem>
                                </>
                            )}
                            <MenuItem className="text-[#EFE7DC] font-bold" component={<Link to="/InicioEstudiante" />}>
                                Información
                            </MenuItem>
                        </SubMenu>

                        <MenuItem
                            className="text-[#EFE7DC] font-bold"
                            icon={<img src="/Imagenes/estudiante.png" alt="Perfil" className="w-8 h-8 inline-block" />}
                            component={<Link to="/PerfilEstudiante" />}
                        >
                            Perfil
                        </MenuItem>

                        <div className="mt-auto">
                            <MenuItem
                                className="text-[#EFE7DC] font-bold"
                                onClick={handleLogout}
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
