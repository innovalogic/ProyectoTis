// src/Componentes/ModalSubirAvance.js
import React from "react";

export default function ModalSubirAvance({ modalVisible, handleCloseModal }) {
  if (!modalVisible) return null; // No renderizar si el modal no está visible

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar que el formulario recargue la página
    // Aquí puedes añadir la lógica para manejar la subida del archivo o enlace
    console.log("Formulario enviado");
  };

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
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "#1E3664" }}
        >
          SUBIR AVANCE
        </h2>

        {/* Nuevo Combobox para seleccionar Tarea */}
        <div className="mb-4">
          <label
            htmlFor="tarea-select"
            className="block mb-2 text-lg font-medium"
            style={{ color: "#1E3664" }}
          >
            Seleccionar Tarea:
          </label>
          <select
            id="tarea-select"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar Tarea</option>
            <option value="tarea1">Tarea 1</option>
            <option value="tarea2">Tarea 2</option>
            <option value="tarea3">Tarea 3</option>
          </select>
        </div>

        {/* Formulario para subir archivos o enlaces */}
        <form onSubmit={handleSubmit}> {/* Añadido el evento onSubmit */}
          {/* Input para subir archivos */}
          <div className="mb-4">
            <label
              htmlFor="file-upload"
              className="block mb-2 text-lg font-medium"
              style={{ color: "#1E3664" }}
            >
              Subir archivo (PDF o DOC):
            </label>
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.doc,.docx"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Input para añadir enlace */}
          <div className="mb-4">
            <label
              htmlFor="link-upload"
              className="block mb-2 text-lg font-medium"
              style={{ color: "#1E3664" }}
            >
              Añadir enlace:
            </label>
            <input
              type="url"
              id="link-upload"
              placeholder="https://example.com"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botón de subir avance */}
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 font-bold"
              style={{ backgroundColor: "#1E3664" }} // Color del botón
            >
              SUBIR AVANCE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
