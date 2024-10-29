import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralEstudiante";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../Componentes/UserContext";


export default function InicioEstudiante() {
  const [notificacionData, setNotificacionData] = useState([]);
  const [error, setError] = useState(null);
  const { setUser } = useUser();
  const { user } = useUser();

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get('http://localhost/proyectotis/backend/CargarNotificacion.php', {
          params: { idDocente: user.idDocente }
        });
        if (response.data.success === true) {
          setNotificacionData(response.data.datos);
          console.log(response.data.datos);
        } else {
          setError('No se pudo obtener los datos.');
        }
      } catch (error) {
        setError('Error al conectarse al servidor: ' + error.message);
      }
    };

    fetchEstudiantes();
  }, []);

  return (
    <>
      <NavbarInicioDeSesion />
      <div style={{ display: 'flex', height: '100%', marginTop: '70px', backgroundColor: '#32569A' }}>
        <BarraLateral />
        <form className="space-y-4 p-4 flex-1 bg-[#c2d2e9] rounded-md">
          {notificacionData.length > 0 && (
            <div className="bg-[#32569A] text-white p-4 rounded-md flex items-center justify-center">
              <p> {notificacionData[0].nombreDocente} {notificacionData[0].apellidoDocente}</p>
              <p> {notificacionData[0].Grupo}</p>
            </div>
          )}

          {notificacionData.length > 0 ? (
            <div className="space-y-4 mt-4">
              {notificacionData.map((notificacion, index) => (
                <div key={index} className="bg-white text-black p-4 rounded-md shadow-md">
                  <p> {notificacion.mensaje}</p>
                  <p>{notificacion.fecha}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-4">{error || "No hay notificaciones disponibles."}</p>
          )}
        </form>
      </div>
      <BarraCopyright />
    </>
  );
}

