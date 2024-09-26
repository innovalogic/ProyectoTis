import React, { useState } from 'react';
import {ModalEst} from '../../Componentes/ComponentesEst/ModalEst'
import FormHU from '../../Componentes/ComponentesEst/FormHU'

const HomeEst = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log('Form data submitted:', data);
    handleCloseModal(); // Cierra el modal después de enviar
  };

  return (
    <div>
      <h1>Ejemplo de Formulario Popup</h1>
      <button onClick={handleOpenModal}>Abrir Formulario</button>
      <ModalEst isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Formulario</h2>
        <FormHU onSubmit={handleFormSubmit} />
      </ModalEst>
    </div>
  );
};

export default HomeEst;