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
  const [formLabel, setFormLabel]=useState('');
  const handleOpenModal = (label) => {
    setFormLabel(label);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (formData) => {
    const newEntry = {
      id: data.length + 1, 
      actividad: formData.actividad,
      pertenece: formData.pertenece,
      titulo: formData.titulo,
      responsable: formData.responsable,
      fecha: formData.fecha,
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
          <div>
            <button className="añadir" onClick={() => handleOpenModal('HU')}> 
              <GoPlus/>
              <span>Añadir HU</span>
            </button>
            <div>
              <ModalEst isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className='titu'>Añadir actividad</h2>
                <FormHU onSubmit={handleSubmit}>
                  {formLabel}
                </FormHU>
              </ModalEst>
            </div>
          </div>
          <div>
            <button className="añadir" onClick={() => handleOpenModal('Tarea')}>
              <GoPlus/>
              <span>Añadir Tarea</span>
            </button>
          </div>
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