import React, { useState, useEffect } from 'react';
import './EstilosComponentes.scss'; 
import Modal from "../Modal";
import { useUser } from '../UserContext';  // Importa el contexto

const FormHU = ({ onSubmit , children}) => {

  const { user } = useUser();  // Accede al contexto de usuario para obtener el idGrupoEmpresa
  const idGrupoEmpresa = user ? user.idGrupoEmpresa : null;  // Extrae el idGrupoEmpresa
  const [Datos, setFormDatos] = useState({
    sprint: children||'',
    titulo: '',
    responsable: '',
    fecha: '',
    idGrupoEmpresa:idGrupoEmpresa
  });
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
});
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    // Actualiza el estado cuando el valor de children cambie
    setFormDatos((prevData) => ({
      ...prevData,
      sprint: children,
    }));
  }, [children]);

  useEffect(() => {
    const fetchData = async () => {
      const dataToSend = {
        idGrupoEmpresa: user.idGrupoEmpresa,
        nomSprint: children,
      };
      console.log('datos:', dataToSend);
      try {
        const response = await fetch('http://localhost/ProyectoTis/Backend/llamadas.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend) // Enviar idGrupoEmpresa
        });
        const text = await response.text(); // Obtener la respuesta como texto
        console.log(text); // Ver el texto que devuelve el servidor
        const data = JSON.parse(text);
        setResponsables(data.responsables);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleConfirmHU = async (e) => {
    e.preventDefault();
    console.log('formData:', Datos);
    if (Datos.fecha) {
      try {

        const formattedDate = new Date(Datos.fecha).toISOString().split('T')[0];

        // Actualiza formDatos con la fecha formateada
        const dataToSend = {
          ...Datos,
          fecha: formattedDate // Usar la fecha formateada
        };

        const response = await fetch('http://localhost/ProyectoTis/Backend/guardarHU.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
          const errorText = await response.text(); // Obtener el texto de error
          console.error('Error en la respuesta del servidor:', errorText);
          throw new Error("Error en la respuesta del servidor.");
        }

        const result = await response.json();
        if (result.success) {
          setModal({
            show: true,
            title: 'HU añadida',
            message: 'La HU fue añadida.'
        });
        } else {
          setModal({
            show: true,
            title: 'Error al añadir la HU',
            message: result.message
        });
        }
      } catch (error) {
        console.error('Error en la solicitud:', error); 
        setModal({
          show: true,
          title: 'Error',
          message: 'Hubo un problema al añadir HU.'
        });
      }
    } else {
      setModal({
        show: true,
        title: 'Error',
        message: 'Seleccione correctamente los datos.'
      });
      return;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Datos.sprint && Datos.titulo && Datos.responsable && Datos.fecha) {
      console.log(Datos); // Debugging
      await handleConfirmHU({ preventDefault: () => {} });
      onSubmit(Datos); // Llama a la función pasada desde el padre
      setFormDatos({ sprint:children, titulo: '', responsable: '', fecha: '' }); // Reinicia el formulario
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const closeModal = () => {
    setModal(prevModal => ({
      ...prevModal,
      show: false
    }));
  };

  return (
    <form onSubmit={handleSubmit} className='FormularioHU'>
      <div>
        <label>Título HU:</label>
        <br></br>
        <input
            type="text"
            name="titulo" 
            value={Datos.titulo}
            onChange={handleChange}
            placeholder="Ingresa nombre de tu HU..."
            required
          />
      </div>
      <div style={{width:'470px' }}>
        <label>
          Responsable:
        </label>
        <br></br>
        <select
          name="responsable"
          value={Datos.responsable}
          onChange={handleChange}
          style={{width:'450px', paddingLeft:'8px', paddingRight:'8px', height:'50px', margin:'10px' }}
        >
          <option value="">Selecciona un responsable</option>
          {responsables.map((responsable, index) => (
            <option key={index} value={responsable.nombre_completo}>
              {responsable.nombre_completo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>
          Fecha de entrega:
        </label>
        <br></br>
        <input 
          type="date" 
          name="fecha" 
          value={Datos.fecha} 
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          required />
      </div>
      <button type="submit" >Añadir</button>
      <Modal
        show={modal.show}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
      />
    </form>
  );
};

export default FormHU;