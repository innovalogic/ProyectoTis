import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralDocente";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../Componentes/UserContext";

export default function InicioDocente() {
  const [notificacionData, setNotificacionData] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get('http://localhost/proyectotis/backend/CargarNotificacion.php', {
          params: { idDocente: user.idDocente }
        });
        if (response.data.success) {
          setNotificacionData(response.data.datos);
        } else {
          setError('No se pudo obtener los datos.');
        }
      } catch (error) {
        setError('Error al conectarse al servidor: ' + error.message);
      }
    };

    fetchEstudiantes();
  }, [user.idDocente]);

  const handleSidebarCollapseChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <>
      <NavbarInicioDeSesion />
      <div style={{ display: 'flex', height: '100%', marginTop: '70px', backgroundColor: '#32569A' }}>
        <BarraLateral onCollapseChange={handleSidebarCollapseChange} />
        <form className="space-y-4 p-4 flex-1 bg-[#c2d2e9] rounded-md">
          {/* Contenido de notificaciones */}
          {notificacionData.length > 0 && (
            <div className="bg-[#32569A] text-white p-4 rounded-md flex items-center justify-center">
              <p>{notificacionData[0].nombreDocente} {notificacionData[0].apellidoDocente}</p>
              <p>{notificacionData[0].Grupo}</p>
            </div>
          )}

          {notificacionData.length > 0 ? (
            <div className="space-y-4 mt-4">
              {notificacionData.map((notificacion, index) => (
                <div key={index} className="bg-white text-black p-4 rounded-md shadow-md">
                  <p>{notificacion.mensaje}</p>
                  <p>{notificacion.fecha}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-4">{error || "No hay notificaciones disponibles."}</p>
          )}
        </form>

        <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-4 left-4 bg-[#32569A] text-white p-4 rounded-full shadow-lg"
            style={{ left: sidebarCollapsed ? '90px' : '260px', transition: 'left 0.3s' }} // Ajuste aquí
          >
            Agregar Notificacion
          </button>

          {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-80">
              <h2 className="text-xl font-bold mb-4">Compartir con la clase:</h2>
              <form>
                <label className="block mb-2">
                  Campo 1:
                  <input type="text" className="border p-2 rounded-md w-full" />
                </label>
                <label className="block mb-4">
                  Campo 2:
                  <input type="text" className="border p-2 rounded-md w-full" />
                </label>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <BarraCopyright />
    </>
  );
}
