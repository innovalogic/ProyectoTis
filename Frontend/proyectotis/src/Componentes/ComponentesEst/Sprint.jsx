import React, { useState, useEffect } from 'react';
import './EstilosComponentes.scss'; 
import { GoPlus } from "react-icons/go";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ModalEst } from './ModalEst';
import FormHU from './FormHU';
import Modal from "../Modal";
import HU from './HU';
import { useUser } from '../UserContext';  // Importa el contexto

const Sprint = ({ title }) => {
  const { user } = useUser();  // Extrae el idGrupoEmpresa

  const [formData, setFormData] = useState({
    fechaInicio: '',
    fechaFin:  '',
    nomSprint: title || '',
    codSis: '' ,
  });

  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
  });

  const [data, setData] = useState([]);
  const [HUs, setHUs] = useState([]); 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLabel, setFormLabel] = useState('');
  const [datesConfirmed, setDatesConfirmed] = useState(false);
  const [huVisible, setHuVisible] = useState(false); 

  const handleOpenModal = (label) => {
    setFormLabel(label);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (Data) => {
    const newHU = {
      sprint: Data.sprint,
      titulo: Data.titulo,
      responsable: Data.responsable,
      fecha: Data.fecha,
    };
    setHUs((prevHUs) => [...prevHUs, newHU]);
    setData((prevData) => [...prevData, newHU]);
    setHuVisible(true);
    handleCloseModal();
  };

  const areDatesValid = () => {
    const valid = startDate !== null && endDate !== null && endDate >= startDate;
    return valid;
  };

  const handleDateChange = (date, type) => {
    if (type === 'startDate') {
      setStartDate(date);
      setFormData(prevFormData => ({
        ...prevFormData,
        fechaInicio: date ? date.toISOString().split('T')[0] : '',
      }));
    } else if (type === 'endDate') {
      setEndDate(date);
      setFormData(prevFormData => ({
        ...prevFormData,
        fechaFin: date ? date.toISOString().split('T')[0] : '',
      }));
    }
  };

  useEffect(() => {
    if (user && user.codSis) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        codSis: String(user.codSis)  // Actualizar codSis cuando esté disponible
      }));
      console.log('formData actualizado:', formData);
    }
  }, [user]); 

  const handleConfirmDates = async (e) => {
    e.preventDefault();
    
    if (!formData.codSis || !formData.fechaInicio || !formData.fechaFin || !formData.nomSprint) {
      setModal({
        show: true,
        title: 'Error',
        message: 'Los datos están incompletos. Asegúrate de seleccionar las fechas y que codSis esté presente.'
      });
      return;
    }
  
    console.log(formData);  // Verificar que el formData contiene todos los valores
  
    if (areDatesValid()) {
      try {
        const response = await fetch('https://tis-1d05d6f982d1.herokuapp.com/guardarSprint.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)  // Enviar los datos con idGrupoEmpresa
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error en la respuesta del servidor:', errorText);
          throw new Error("Error en la respuesta del servidor.");
        }

        const result = await response.json();
        console.log(result);
        if (result.success) {
          setModal({
            show: true,
            title: 'Sprint añadido',
            message: 'El Sprint fue añadido exitosamente.'
          });
          setDatesConfirmed(true);
        } else {
          setModal({
            show: true,
            title: 'Error al añadir Sprint',
            message: result.message
          });
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setModal({
          show: true,
          title: 'Error',
          message: 'Hubo un problema al añadir Sprint.'
        });
      }
    } else {
      setModal({
        show: true,
        title: 'Error',
        message: 'Seleccione las fechas de inicio y fin de su Sprint.'
      });
      return;
    }
  };

  const closeModal = () => {
    setModal(prevModal => ({
      ...prevModal,
      show: false
    }));
  };

  return (
    <div className="Sprint">
      <div className="contenido">
        {title}
        <div className='fechas'>
          <div className='date'>
            <span>Fecha de inicio</span>
            <DatePicker 
              selected={startDate} 
              onChange={(date) => handleDateChange(date, 'startDate')} 
              dateFormat="yyyy-MM-dd"
              className='dt'
              placeholderText="Elige una fecha..." 
              minDate={new Date()}/>
          </div>
          <div className='date'>
            <span>Fecha final</span>
            <DatePicker 
              selected={endDate} 
              onChange={(date) => handleDateChange(date, 'endDate')} 
              dateFormat="yyyy-MM-dd"
              className='dt'
              placeholderText="Elige una fecha..." 
              minDate={startDate}/>
          </div>
          <button className="dat" onClick={handleConfirmDates}
          disabled={datesConfirmed}
          style={{ backgroundColor: datesConfirmed ? '#ccc' : '' }}>Confirmar fechas</button>
        </div>
        {!areDatesValid() && (
          <p style={{ color: 'red', marginTop: '10px', fontSize:'20px', width:'auto' }}>
            Selecciona las fechas y confirma para poder añadir una actividad.
          </p>
        )}
        <div className='botones'>
          <div>
            <button className="añadir" onClick={() => handleOpenModal(title)}
            disabled={!datesConfirmed}
            style={{ backgroundColor: !datesConfirmed ? '#ccc' : '' }}
              > 
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
        </div> 
        <div>
        {huVisible && (
          <div>
            <HU hus={HUs} nomSprint={formData.nomSprint}/>        
          </div>
        )}       
        </div>
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

export default Sprint;