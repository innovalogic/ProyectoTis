import React, { useState } from 'react';

const ModalSubirAvance = ({ modalVisible, handleCloseModal, tarea, handleTareaChange, handleSubmit }) => {
  const [nombreArchivo, setNombreArchivo] = useState("");

  if (!modalVisible) return null; // Si el modal no está visible, no renderizar nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-custom-bg p-8 rounded-lg shadow-lg w-96">
        {/* Botón de cerrar como una "X" en la parte superior derecha */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1E3664] text-white flex items-center justify-center hover:bg-blue-700 transition duration-200"
          onClick={handleCloseModal}
          aria-label="Cerrar"
        >
          X
        </button>
        
        {/* Título centrado */}
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "#1E3664" }}>
          SUBIR AVANCE
        </h2>

        {/* Nuevo Combobox para seleccionar Tarea */}
        <div className="mb-4">
          <label htmlFor="tarea-select" className="block mb-2 text-lg font-medium" style={{ color: "#1E3664" }}>
            Seleccionar Tarea:
          </label>
          <select
            id="tarea-select"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleTareaChange}
          >
            <option value="">Seleccionar Tarea</option>
            {tarea.map((tareas, index) => (
              <option key={index} value={tareas.titulo}>
                {tareas.titulo}
              </option>
            ))}
          </select>
        </div>

        {/* Formulario para subir archivos o enlaces */}
        <form onSubmit={handleSubmit}>
          {/* Input para subir archivos */}
          <div className="mb-4">
            <label htmlFor="file-upload" className="block mb-2 text-lg font-medium" style={{ color: "#1E3664" }}>
              Subir archivo (PDF o DOC):
            </label>
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.doc,.docx"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  setNombreArchivo(file.name); // Actualiza el estado con el nombre del archivo
                } else {
                  setNombreArchivo(""); // Resetea el nombre si no hay archivo
                }
              }}
            />
            {nombreArchivo && (
              <div className="mt-2 text-gray-700">
                <strong>Archivo seleccionado:</strong> {nombreArchivo}
              </div>
            )}
          </div>

          {/* Input para subir enlace */}
          <div className="mb-4">
            <label htmlFor="link-upload" className="block mb-2 text-lg font-medium" style={{ color: "#1E3664" }}>
              Subir enlace:
            </label>
            <input
              type="text"
              id="link-upload"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa un enlace"
            />
          </div>

          {/* Botón para enviar */}
          <button
            type="submit"
            className="bg-[#1E3664] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200"
          >
            SUBIR
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalSubirAvance;
