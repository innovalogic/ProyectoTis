import React, { useState } from 'react';
import './EstilosComponentes.scss'; 
const FormHU = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    hu: '',
    responsable: '',
    fecha: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.hu && formData.responsable && formData.fecha) {
      onSubmit(formData); // Llama a la función pasada desde el padre
      setFormData({ hu: '', responsable: '', fecha: '' }); // Reinicia el formulario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='formulario'>
        <label>
          Nombre de la HU:
        </label>
        <br></br>
        <input
            type="text"
            name="hu" value={formData.hu}
            onChange={handleChange}
            required
          />
      </div>
      <div>
        <label>
          Responsable:
        </label>
        <br></br>
        <input
            type="text"
            name="responsable"
            value={formData.responsable}
            onChange={handleChange}
            required
          />
      </div>
      <div>
        <label>
          Fecha de entrega:
        </label>
        <br></br>
        <input 
          type="date" 
          name="fecha" 
          value={formData.fecha} 
          onChange={handleChange} 
          required />
      </div>
      <button type="submit">Añadir</button>
    </form>
  );
};

export default FormHU;