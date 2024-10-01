import React, { useState } from 'react';
import './EstilosComponentes.scss'; 
import { GoPlus } from "react-icons/go";
import FormTarea from './FormTarea';
import Modal from '../Modal';
import {ModalEst} from './ModalEst'

const HU = ({ hus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
});
  const [tareas, setTareas] = useState([]);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setModal(prevModal => ({
      ...prevModal,
      show: false
    }));
  };

  const handleSubmitTarea = (formDatos) => {
    const nuevaTarea = {
      pertenece: formDatos.pertenece,
      titulo: formDatos.titulo,
      responsable: formDatos.responsable,
      fecha: formDatos.fecha
    };

    // Actualizar el estado de tareas con la nueva tarea
    setTareas((prevTareas) => [...prevTareas, nuevaTarea]);
    handleCloseModal(); // Cierra el modal al enviar
  };

  return (
    <div className="hu-container">
      <div  className='titHU'>
        <h2 className='T'>Historias de Usuario</h2>
        <button  
        className="btn-add-hu" 
        onClick={handleOpenModal}>
         <GoPlus/>
        Añadir Tarea
      </button>
      <div>
        <ModalEst isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className='titu'>Añadir actividad</h2>
          <FormTarea onSubmit={handleSubmitTarea}></FormTarea>
        </ModalEst>
      </div>
      </div>
      <div className="huc">
        {hus.map((hu, index) => (
          <div key={index} className="hu-grid-header">
            <div><strong>Título: </strong>{hu.titulo}</div>
            <div><strong>Responsable: </strong> {hu.responsable}</div>
            <div><strong>Fecha de entrega: </strong> {hu.fecha}</div>
            {tareas
              .filter(tarea => tarea.pertenece === hu.titulo) // Filtrar las tareas que coinciden
              .map((tarea, tareaIndex) => (
                <div key={tareaIndex} className="hu-grid-row" style={{ paddingLeft: '20px', fontWeight:'400px' }}>
                  <div><strong> Tarea: </strong>{tarea.titulo}</div>
                  <div><strong> Responsable: </strong>{tarea.responsable}</div>
                  <div><strong> Fecha de entrega: </strong>{tarea.fecha}</div>
                </div>
            ))}
          </div>
        ))}
      </div>
      <Modal
        show={modal.show}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default HU;