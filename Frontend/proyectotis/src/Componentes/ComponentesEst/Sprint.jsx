import React, { useState } from 'react';
import './EstilosComponentes.scss'; 
import { GoPlus } from "react-icons/go";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ModalEst} from './ModalEst'
import FormHU from './FormHU'
import TablaHU from './TablaHU';

const Sprint = ({ title }) => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [StartDate, SetStartDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (formData) => {
    const newEntry = {
      id: data.length + 1, // Asigna un ID basado en la longitud actual del array
      hu: formData.hu,
      responsable: formData.responsable,
      fecha: formData.fecha,
      estado: formData.estado,
    };
    setData((prevData) => [...prevData, newEntry]); // Añade el nuevo dato al array
    handleCloseModal();
  };
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id)); // Elimina el item basado en el ID
  };
  return (
    <div className="Sprint">
      <div className="contenido">
        {title}
        <div className='fechas'>
          <div className='date'>
            <span>Fecha de inicio</span>
            <DatePicker 
              selected={startDate} onChange={(date) => setStartDate(date)} 
              dateFormat="dd/MM/yyyy" 
              className='dt'
              placeholderText="Elige una fecha..."/>
          </div>
          <div className='date'>
            <span>Fecha final</span>
            <DatePicker 
              selected={StartDate} onChange={(date) => SetStartDate(date)} 
              dateFormat="dd/MM/yyyy" 
              className='dt'
              placeholderText="Elige una fecha..." />
          </div>
        </div>
        <div className='botones'>
          <button className="añadir" onClick={handleOpenModal}> 
            <GoPlus/>
            <span>Añadir HU</span>
          </button>
          <div>
          <ModalEst isOpen={isModalOpen} onClose={handleCloseModal} className=''>
            <h2 className='titu'>Añadir Historia de Usuario</h2>
            <FormHU onSubmit={handleSubmit} />
          </ModalEst>
          </div>
          <button className="añadir">
            <GoPlus/>
            <span>Añadir Tarea</span>
          </button>
        </div> 
        <div className='tabla'>
          {data.length > 0 ? (
            <TablaHU data={data} onDelete={{handleDelete}}/>  
            ) : (<p>Sin historias de usuario.</p>
          )}          
        </div>
      </div>
    </div>
  );
};

export default Sprint;