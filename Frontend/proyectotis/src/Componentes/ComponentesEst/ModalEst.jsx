import React from 'react';
import './EstilosComponentes.scss'; 
export const ModalEst = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no renderizar nada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times; {/* Cerrar el modal */}
        </button>
        {children} {/* Contenido del modal */}
      </div>
    </div>
  );
}