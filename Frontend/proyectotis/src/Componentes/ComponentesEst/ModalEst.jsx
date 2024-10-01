import React, { useEffect, useRef } from 'react';
import './EstilosComponentes.scss'; 
import { TiDelete } from "react-icons/ti";

export const ModalEst = ({ isOpen, onClose, children }) => {
  const handleKeyDownRef = useRef(null)

  useEffect(() => {
    handleKeyDownRef.current= (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDownRef.current);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDownRef.current);
      document.body.style.overflow = 'auto'; // Rehabilitar scroll al desmontar el componente
    };
  }, [isOpen, onClose]);


  if (!isOpen) return null; // Si el modal no está abierto, no renderizar nada

  return (
    <div className="Mod-overlay">
      <div className="Mod-content">
        <button 
          className="close-btn" 
          onClick={onClose}
          aria-label='Cerrar modal'
        >
          <TiDelete />
        </button>
        {children} {/* Contenido del modal */}
      </div>
    </div>
  );
}