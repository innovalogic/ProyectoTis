import React, { useState, useEffect } from 'react';
import './EstilosComponentes.scss'; 
const FormHU = ({ onSubmit, children }) => {
  const [formDatos, setFormDatos] = useState({
    actividad: children || '',
    pertenece:'',
    titulo: '',
    responsable: '',
    fecha: '',
  });
  useEffect(() => {
    // Actualiza el estado cuando el valor de children cambie
    setFormDatos((prevData) => ({
      ...prevData,
      actividad: children,
    }));
  }, [children]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formDatos.pertenece && formDatos.titulo && formDatos.responsable && formDatos.fecha) {
      onSubmit(formDatos); // Llama a la función pasada desde el padre
      setFormDatos({ actividad:children, pertenece: '', titulo: '', responsable: '', fecha: '' }); // Reinicia el formulario
    }
  };

  return (
    <form onSubmit={handleSubmit} className='FormularioHU'>
      <div>
        <label>
          Pertenece a:
        </label>
        <br></br>
        <input
            type="text"
            name="pertenece"
            value={formDatos.pertenece}
            onChange={handleChange}
            placeholder="Selecciona la HU "
          />
      </div>
      <div>
        <label>{children}:</label>
        <br></br>
        <input
            type="text"
            name="titulo" 
            value={formDatos.titulo}
            onChange={handleChange}
            placeholder="Ingresa nombre de tu actividad..."
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
            placeholder="Elige un responsable..."
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