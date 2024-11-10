import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../Componentes/UserContext";
import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralDocente";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";

function AgregarNotificacionModal({ showModal, setShowModal, onPublicarClick }) {
  const [mensaje, setMensaje] = useState("");
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);

  const handleLinkChange = (e) => setLink(e.target.value);
  
  const addLink = () => {
    if (link) {
      setLinks([...links, link]);
      setLink("");
    }
  };

  const removeLink = (index) => setLinks(links.filter((_, i) => i !== index));

  const handleModalClose = () => {
    setShowModal(false);
    setMensaje("");
    setLinks([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPublicarClick(mensaje, links);
    handleModalClose();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#efe7dc] p-6 rounded-md shadow-lg max-w-lg w-full">
        <h2 className="text-[#32569A] font-bold mb-4">Compartir con la clase:</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="p-2 rounded-md w-full bg-[#e1d7b7] border border-gray-300 h-24 resize-none mb-4"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe el mensaje aquí"
          />
          <div className="flex mb-4">
            <input
              type="url"
              placeholder="https://ejemplo.com"
              value={link}
              onChange={handleLinkChange}
              className="p-2 rounded-md w-full bg-[#e1d7b7] border border-gray-300"
            />
            <button
              type="button"
              onClick={addLink}
              className="ml-2 bg-[#32569A] text-white px-4 py-2 rounded-md"
            >
              Añadir
            </button>
          </div>
          <ul className="mb-4 space-y-2">
            {links.map((link, index) => (
              <li key={index} className="flex items-center justify-between bg-[#e1d7b7] p-2 rounded-md">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline truncate">
                  {link}
                </a>
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="text-red-500 ml-2"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleModalClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#32569A] text-white px-4 py-2 rounded-md"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function InicioDocente() {
  const [notificacionData, setNotificacionData] = useState([]);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  const fetchNotificaciones = async () => {
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
  const guardarNotificacion = async (mensaje, links) => {
    const currentDateTime = new Date();
    const fecha = currentDateTime.toISOString().split("T")[0];
    const hora = currentDateTime.toTimeString().split(" ")[0];

    try {
      const response = await axios.post('http://localhost/proyectotis/backend/GuardarNotificacion.php', {
        campo1: mensaje,
        links: links,
        fecha: fecha,
        hora: hora,
        idDocente: user.idDocente,
      });
      if (!response.data.success) alert("Error al guardar la notificación.");
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  const handleEnviarNotificacion = async (mensaje) => {
    try {
      const response = await axios.post('http://localhost/proyectotis/backend/EnviarCorreo.php', {
        asunto: "materia-Tis",
        mensaje: mensaje,
      });
      if (!response.data.success) console.log(response.data.message || 'Ocurrió un error al enviar algunos correos.');
    } catch (error) {
      console.log('Error al conectar con el servidor: ' + error.message);
    }
  };

  const handlePublicarClick = (mensaje, links) => {
    guardarNotificacion(mensaje, links);
    handleEnviarNotificacion(mensaje);
  };

  useEffect(() => {
    fetchNotificaciones();
  }, [user.idDocente]);

  const handleSidebarCollapseChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <>
      <NavbarInicioDeSesion />
      <div style={{ display: 'flex', height: '100%', marginTop: '70px', backgroundColor: '#32569A' }}>
        <BarraLateral onCollapseChange={handleSidebarCollapseChange} />
        <form className="space-y-4 p-4 flex-1 bg-[#efe7dc] rounded-md">
          {notificacionData.length > 0 && (
            <div className="bg-[#32569A] text-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2 text-left">TALLER DE INGENIERIA DE SOFTWARE</h2>
            <div className="flex justify-between">
              <p className="text-xl font-bold">{notificacionData[0].nombreDocente} {notificacionData[0].apellidoDocente}</p>
              <p className="text-xl font-bold">{notificacionData[0].Grupo}</p>
            </div>
          </div>
          )}
          <div className="bg-[#e1d7b7] border border-black rounded-lg p-4">
            <h2 className="text-[#32569A] font-bold mb-2">NOTIFICACIONES DE TALLER DE INGENIERIA DE SOFTWARE</h2>
            {notificacionData.length > 0 ? (
              <div className="space-y-4 mt-4">
                {notificacionData.map((notificacion, index) => (
                  <div key={index} className="bg-[#32569A] text-white p-4 rounded-md shadow-md">
                    <p>{notificacion.mensaje}</p>
                    <p>{notificacion.fecha}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-4">{error || "No hay notificaciones disponibles."}</p>
            )}
          </div>
        </form>

        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-4 bg-[#32569A] text-white p-4 rounded-full shadow-lg"
          style={{ left: sidebarCollapsed ? '90px' : '260px', transition: 'left 0.3s' }}
        >
          Agregar Notificación
        </button>

        <AgregarNotificacionModal
          showModal={showModal}
          setShowModal={setShowModal}
          onPublicarClick={handlePublicarClick}
        />
      </div>
      <BarraCopyright />
    </>
  );
}
