import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';
import CardEmpresa from '../Componentes/CardEmpresa';
import { useUser } from "../Componentes/UserContext";
import React, { useEffect, useState } from 'react';

export default function RegistroEvFinal() {
    const { user } = useUser();
    const [grupos, setGrupos] = useState([]);


    useEffect(() => {
        // Hacer una solicitud al backend para obtener los grupos empresa
        fetch(`http://localhost/proyectotis/backend/obtenergruposevsem.php?idDocente=${user.idDocente}`)
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
            });
    }, [user.idDocente]);

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="flex h-full w-screen mt-[70px] bg-[#32569A]">
                <BarraLateralDocente />
                <div className="w-screen bg-[#efe7dc] p-4">
                    <h1 className="text-4xl font-bold text-[#32569A] text-center mb-4">Registrar Evaluaciones Finales</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {grupos.map(grupo => (
                            <CardEmpresa nombreEmpresa={grupo.nombreEmpresa} logoUrl={grupo.logoEmpresa} idGrupoEmpresa={grupo.idGrupoEmpresa} nombreCortoEmpresa={grupo.nombreCortoEmpresa} />
                        ))}
                        <CardEmpresa nombreEmpresa="Error 404" logoUrl="" idGrupoEmpresa="" nombreCortoEmpresa="" />
                        <CardEmpresa nombreEmpresa="DEVLOGIC" logoUrl="" idGrupoEmpresa="" nombreCortoEmpresa="" />
                        <CardEmpresa nombreEmpresa="CodeFast" logoUrl="" idGrupoEmpresa="" nombreCortoEmpresa="" />
                        <CardEmpresa nombreEmpresa="DEVFAST" logoUrl="" idGrupoEmpresa="" nombreCortoEmpresa="" />
                    </div>
                </div>
            </div>
            <Copyright />
        </>
    );
}
