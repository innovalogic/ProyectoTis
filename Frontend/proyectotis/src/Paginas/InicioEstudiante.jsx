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
        if (response.data.success) {
          const sortedData = response.data.datos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          setNotificacionData(sortedData);
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
            <div className="bg-[#32569A] text-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2 text-left">TALLER DE INGENIERIA DE SOFTWARE</h2>
            <div className="flex justify-between">
              <p className="text-xl font-bold">{notificacionData[0].nombreDocente} {notificacionData[0].apellidoDocente}</p>
              <p className="text-xl font-bold">{notificacionData[0].Grupo}</p>
            </div>
          </div>
          )}

          <h2 className="text-[#32569A] font-bold mb-2">NOTIFICACIONES DE TALLER DE INGENIERIA DE SOFTWARE</h2>
          {notificacionData.length > 0 ? (
           <div className="space-y-4 mt-4">
           {notificacionData.map((notificacion, index) => (
             <div
                key={index}
                className="bg-[#4A76B8] text-white p-4 rounded-md border-4"
                style={{ borderColor: '#32569A' }}
              >
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                   <img src="/src/Imagenes/docente.png" className="w-6 h-6" alt="Docente Logo" />
                   <span className="font-bold text-lg">{notificacion.nombreDocente} {notificacion.apellidoDocente}</span>
                 </div>
                 <img src="/src/Imagenes/campana.png" className="w-6 h-6" alt="Campana" />
               </div>
               <br />
               <p className="text-xl">{notificacion.mensaje}</p> {/* Texto más grande para el mensaje */}
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

