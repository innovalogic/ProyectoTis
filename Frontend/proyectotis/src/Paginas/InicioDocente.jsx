import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralDocente";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../Componentes/UserContext";

export default function InicioDocente() {
  const [notificacionData, setNotificacionData] = useState([]);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useUser();

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Previsualiza solo imágenes, de lo contrario, muestra el nombre del archivo
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(file.name);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview('');
    document.getElementById('file-upload').value = ''; // Limpia el input de archivo
  };

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
              <h2 className="text-xl font-bold mb-2">TALLER DE INGENIERIA DE SOFTWARE</h2>
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
          <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Compartir con la clase:</h2>
            <form>
              <label className="block mb-2">
                Campo 1:
                <input type="text" className="border p-2 rounded-md w-full" />
              </label>
              <div className="flex items-center mb-4">
                <input
                  type="file"
                  accept=".doc,.pdf,.png,.jpeg"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange} // Maneja el archivo seleccionado
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('file-upload').click()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Añadir
                </button>
              </div>
              {/* Previsualización del archivo */}
              {selectedFile && (
                <div className="flex items-center mb-4">
                  {filePreview.startsWith('data:image/') ? ( // Si es una imagen
                    <img src={filePreview} alt="Vista previa" className="max-w-full h-auto rounded-md" />
                  ) : (
                    <div className="border p-2 rounded-md bg-gray-100">
                      <p className="mr-2">{filePreview}</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-500 ml-2"
                  >
                    &times;
                  </button>
                </div>
              )}
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
