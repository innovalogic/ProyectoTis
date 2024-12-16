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

  const fetchNotificaciones = async () => {
    try {
      const response = await axios.get('http://innovalogic.tis.cs.umss.edu.bo/CargarNotificacion.php', {
        params: { idDocente: user.idDocente }
      });
      if (response.data.success) {
        const sortedData = response.data.datos;

        setNotificacionData(sortedData);
      } else {
        setError('No se pudo obtener los datos.');
      }
    } catch (error) {
      setError('Error al conectarse al servidor: ' + error.message);
    }
  };
  useEffect(() => {
    fetchNotificaciones();
  }, [user.idDocente]);

  const groupedNotifications = notificacionData.reduce((acc, curr) => {
    const key = `${curr.idnotificacion}-${curr.mensaje}`; // Combina ID y mensaje para hacerlos únicos
    if (!acc[key]) {
      acc[key] = {
        ...curr,
        enlaces: curr.enlace ? [curr.enlace] : [],
      };
    } else if (curr.enlace) {
      acc[key].enlaces.push(curr.enlace);
    }
    return acc;
  }, {});
  const notificationsArray = Object.values(groupedNotifications);

  return (
    <>
      <NavbarInicioDeSesion />
      <div style={{ display: 'flex', height: 'calc(-110px + 100vh)', marginTop: '70px', backgroundColor: '#32569A' }}>
        <BarraLateral />
        <form className="space-y-4 p-4 flex-1 bg-[#c2d2e9] rounded-md" style={{  overflowY: 'auto'  }}>
          {notificacionData.length > 0 && (
            <div className="bg-[#32569A] text-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2 text-left">TALLER DE INGENIERIA DE SOFTWARE</h2>
            <div className="flex justify-between">
              <p className="text-xl font-bold">{notificacionData[0].nombreDocente} {notificacionData[0].apellidoDocente}</p>
              <p className="text-xl font-bold">{notificacionData[0].Grupo}</p>
            </div>
          </div>
          )}
            <h2 className="text-[#32569A] font-bold mb-2">NOTIFICACIONES DE TALLER DE INGENIERIA DE SOFTWARE</h2>
            {notificationsArray.length > 0 ? (
              <div className="space-y-4 mt-4">
                {notificationsArray.map((notificacion, index) => (
                  <div
                    key={index}
                    className="bg-[#4A76B8] text-white p-4 rounded-md border-4"
                    style={{ borderColor: '#32569A' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img src="/Imagenes/docente.png" className="w-6 h-6" alt="Docente Logo" />
                        <span className="font-bold text-lg">
                          {notificacion.nombreDocente} {notificacion.apellidoDocente}
                        </span>
                      </div>
                      <img src="/Imagenes/campana.png" className="w-6 h-6" alt="Campana" />
                    </div>

                    <br />

                    <p className="text-xl">{notificacion.mensaje}</p>

                    {notificacion.enlaces.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {notificacion.enlaces.map((enlace, i) => (
                          <a key={i} href={enlace} target="_blank" rel="noopener noreferrer" className="text-yellow-500 underline block">
                            {enlace}
                          </a>
                        ))}
                      </div>
                    )}

                    <p className="text-sm mt-2">{notificacion.fechaHora}</p>
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

