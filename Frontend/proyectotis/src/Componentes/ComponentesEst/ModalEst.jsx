import React, { useEffect } from 'react';
import './EstilosComponentes.scss'; 
import { TiDelete } from "react-icons/ti";

export const ModalEst = ({ isOpen, onClose, children }) => {
  // Cerrar el modal con la tecla 'Esc'
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Desactivar el scroll en el fondo
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Rehabilitar scroll al desmontar el componente
    };
  }, [isOpen, onClose]);


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