import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';
import CardEmpresa from '../Componentes/CardEmpresa';
import { useUser } from "../Componentes/UserContext";
import React, { useEffect, useState } from 'react';

export default function RegistroEvFinal() {
    const { user } = useUser();
    const [grupos, setGrupos] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga

    useEffect(() => {
        // Hacer una solicitud al backend para obtener los grupos empresa
        fetch(`https://tis-e8f3f498eaee.herokuapp.com/obtenergruposfinal.php?idDocente=${user.idDocente}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los grupos');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setGrupos(data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los grupos empresa:", error);
            })
            .finally(() => setLoading(false)); // Finalizar el indicador de carga
    }, [user.idDocente]);

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="flex h-full w-screen mt-[70px] bg-[#32569A]">
                <BarraLateralDocente />
                <div className="w-screen bg-[#efe7dc] p-4">
                    <h1 className="text-4xl font-bold text-[#32569A] text-center mb-4">Registrar Evaluaciones Finales</h1>

                    {loading ? ( // Mostrar un mensaje de carga mientras los datos se están obteniendo
                        <p className="text-center text-gray-500">Cargando grupos...</p>
                    ) : grupos.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                            {grupos.map(grupo => (
                                <CardEmpresa
                                    key={grupo.idGrupoEmpresa} // Agregar una key única para cada grupo
                                    nombreEmpresa={grupo.nombreEmpresa}
                                    logoUrl={grupo.logoEmpresa}
                                    idGrupoEmpresa={grupo.idGrupoEmpresa}
                                    nombreCortoEmpresa={grupo.nombreCortoEmpresa}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="bg-white p-8 rounded shadow-md text-center">
                                <p className="text-2xl text-[#32569A] font-bold">No hay grupos disponibles</p>
                                <p className="text-gray-600 mt-2">Todos los grupos tienen una evaluación Final registrada.</p>
                        </div>
                        </div>
                    )}
                </div>
            </div>
            <Copyright />
        </>
    );
}


