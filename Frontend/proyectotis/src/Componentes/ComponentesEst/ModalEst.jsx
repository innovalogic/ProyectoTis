import React from 'react';
import './EstilosComponentes.scss'; 
import { TiDelete } from "react-icons/ti";
export const ModalEst = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no renderizar nada

  return (
    <div className="Mod-overlay">
      <div className="Mod-content">
        <button className="close-btn" onClick={onClose}>
          <TiDelete />
        </button>
        {children} {/* Contenido del modal */}
      </div>
    </div>
  );
}