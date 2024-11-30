import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../Componentes/UserContext";
import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralDocente";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";

function AgregarNotificacionModal({ showModal, setShowModal, onPublicarClick, grupo}) {
  const [mensaje, setMensaje] = useState("");
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const [grupoElegido, setGrupo] = useState("");

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
    onPublicarClick(mensaje, links, grupoElegido);
    handleModalClose();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#efe7dc] p-6 rounded-md shadow-lg max-w-lg w-full">
      <h2 className="text-[#32569A] font-bold mb-4">Seleccionar Grupo:</h2>
      <select
          id="grupo"
          name="grupo"
          value={grupoElegido}
          className="p-2 rounded-md w-full bg-[#e1d7b7] border border-gray-300"
          onChange={(e) => setGrupo(e.target.value)} 
        >
          <option value="NULL">Todos los Estudiantes</option>
          {grupo.length > 0 ? (
            grupo.map((g, index) => (
              <option key={index} value={g.idGrupoEmpresa}>
                {g.nombreEmpresa}
              </option>
            ))
          ) : (
            <option disabled>No hay grupos disponibles</option>
          )}
        </select>

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
  const [grupo, setGrupo] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  function SuccessModal({ show, onClose }) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#efe7dc] p-6 rounded-md shadow-lg max-w-lg w-full">
          <h2 className="text-[#32569A] font-bold mb-4">Notificación Enviada</h2>
          <p className="mb-4">La notificación fue enviada con éxito.</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-[#32569A] text-white px-4 py-2 rounded-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const cargarDatosGrupo = async (idDocente) => {
    try {
        const response = await axios.get('http://localhost/proyectotis/backend/CargarGrupoDoc.php', {
            params: { idDocente }
        });

        if (response.data && response.data.success && Array.isArray(response.data.datos)) {
            setGrupo(response.data.datos.map(dato => ({
                idGrupoEmpresa: dato.idGrupoEmpresa,
                nombreEmpresa: dato.nombreEmpresa
            })));
        } else {
            setGrupo([]); 
        }
    } catch (error) {
        console.error('Error al cargar los datos del grupo:', error.message);
        setGrupo([]); 
    }
};

  const fetchNotificaciones = async () => {
    try {
      const response = await axios.get('http://localhost/proyectotis/backend/CargarNotificacion.php', {
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

  const guardarNotificacion = async (mensaje, links) => {
    const currentDateTime = new Date().toISOString().split(".")[0] + "Z";
console.log(currentDateTime);
  
    try {
      const response = await axios.post('http://localhost/proyectotis/backend/GuardarNotificacion.php', {
        campo1: mensaje,
        links: links,
        fechaHora: currentDateTime, // Un único campo para fecha y hora
        idDocente: user.idDocente,
      });
  
      if (!response.data.success) {
        console.log("Error al guardar la notificación.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  const handleEnviarNotificacion = async (mensaje,grupoElegido) => {
    try {
      console.log(mensaje, user.idDocente,grupoElegido)
      const response = await axios.post('http://localhost/proyectotis/backend/EnviarCorreo.php', {
        asunto: "Materia-Taller de ingenieria de software",
        mensaje: mensaje,
        idDocente: user.idDocente,
        idGrupoEmpresa: grupoElegido
      });
      setShowSuccessModal(true);
      if (!response.data.success) console.log(response.data.message || 'Ocurrió un error al enviar algunos correos.');
    } catch (error) {
      console.log('Error al conectar con el servidor: ' + error.message);
    }
  };

  const handlePublicarClick  = async (mensaje, links, grupoElegido) => {
    await guardarNotificacion(mensaje, links); // Asegúrate de que esta operación termine
  await handleEnviarNotificacion(mensaje, grupoElegido); // Asegúrate de que esta operación termine
  await fetchNotificaciones();
  };

  useEffect(() => {
    fetchNotificaciones();
    cargarDatosGrupo(user.idDocente);

  }, [user.idDocente]);

  const handleSidebarCollapseChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

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
          </div>
        </form>

        <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-4 bg-[#32569A] text-white p-4 rounded-full shadow-lg flex items-center space-x-2"
            style={{ left: sidebarCollapsed ? '90px' : '260px', transition: 'left 0.3s' }}
          >
            <img src="/Imagenes/plus.png" className="w-6 h-6" alt="mas" />
            <span>Agregar Notificación</span>
          </button>

          <SuccessModal
          show={showSuccessModal}
          onClose={() => setShowSuccessModal(false)} // Close the success modal
        />

        <AgregarNotificacionModal
          showModal={showModal}
          setShowModal={setShowModal}
          onPublicarClick={handlePublicarClick}
          grupo={grupo}
        />
      </div>
      <BarraCopyright />
    </>
  );
}
