import React, { useState } from 'react';
import './EstilosComponentes.scss'; 
const FormHU = ({ onSubmit, children }) => {
  const [formDatos, setFormDatos] = useState({
    titulo: children || '',
    responsable: '',
    fecha: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formDatos.titulo && formDatos.responsable && formDatos.fecha) {
      onSubmit(formDatos); // Llama a la función pasada desde el padre
      setFormDatos({ titulo: '', responsable: '', fecha: '' }); // Reinicia el formulario
    }
  };

  return (
    <form onSubmit={handleSubmit} className='FormularioHU'>
      <div className='formulario'>
        <label>{children}:</label>
        <br></br>
        <input
            type="text"
            name="hu" value={formDatos.titulo}
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
            value={formDatos.responsable}
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
          value={formDatos.fecha} 
          onChange={handleChange} 
          required />
      </div>
      <button type="submit">Añadir</button>
    </form>
  );
};

export default FormHU;