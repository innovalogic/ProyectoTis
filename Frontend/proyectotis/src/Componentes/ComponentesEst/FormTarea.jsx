import React, { useState, useEffect } from 'react';
import './EstilosComponentes.scss'; 
import Modal from "../Modal";
import { useUser } from '../UserContext';  // Importa el contexto
const FormTarea = ({ onSubmit }) => {
  const { user } = useUser();  // Accede al contexto de usuario para obtener el idGrupoEmpresa
  const idGrupoEmpresa = user ? user.idGrupoEmpresa : null;  // Extrae el idGrupoEmpresa
  const [formDatos, setFormDatos] = useState({
    pertenece:'',
    titulo: '',
    responsable: '',
    fecha: '',
    idGrupoEmpresa: idGrupoEmpresa
  });
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
});
  const [responsables, setResponsables] = useState([]);
  const [historiasdeu, setHistoriasdeU] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://tis-1d05d6f982d1.herokuapp.com/llamadas.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idGrupoEmpresa: idGrupoEmpresa }) // Enviar idGrupoEmpresa
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://tis-1d05d6f982d1.herokuapp.com/llamadas.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idGrupoEmpresa: idGrupoEmpresa }) // Enviar idGrupoEmpresa
        });
        const text = await response.text(); // Obtener la respuesta como texto
        console.log(text); // Ver el texto que devuelve el servidor
        const data = JSON.parse(text);
        setHistoriasdeU(data.historiasdeu);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleConfirmTarea = async (e) => {
    e.preventDefault();
    console.log('formData:', formDatos);
    if (formDatos.fecha) {
      try {

        const formattedDate = new Date(formDatos.fecha).toISOString().split('T')[0];

        // Actualiza formDatos con la fecha formateada
        const dataToSend = {
          ...formDatos,
          fecha: formattedDate // Usar la fecha formateada
        };

        const response = await fetch('https://tis-1d05d6f982d1.herokuapp.com/guardarTarea.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDatos)
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
            title: 'Tarea añadida',
            message: 'La Tarea fue añadida.'
        });
        } else {
          setModal({
            show: true,
            title: 'Error al añadir Tarea',
            message: result.message
        });
        }
      } catch (error) {
        console.error('Error en la solicitud:', error); 
        setModal({
          show: true,
          title: 'Error',
          message: 'Hubo un problema al añadir Tarea.'
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
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (formDatos.pertenece && formDatos.titulo && formDatos.responsable && formDatos.fecha) {
      console.log(formDatos); // Debugging
      await handleConfirmTarea({preventDefault: () => {}});
      onSubmit(formDatos); // Llama a la función pasada desde el padre
      setFormDatos({ pertenece: '', titulo: '', responsable: '', fecha: '' }); // Reinicia el formulario
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
      <div style={{width:'470px' }}>
        <label>
          Pertene a la HU:
        </label>
        <br></br>
        <select
          name="pertenece"
          value={formDatos.pertenece}
          onChange={handleChange}
          style={{width:'450px', paddingLeft:'8px', paddingRight:'8px', height:'50px', margin:'10px' }}
        >
          <option value="">Selecciona una HU</option>
          {historiasdeu.map((historiasdeu, index) => (
            <option key={index} value={historiasdeu.titulo}>
              {historiasdeu.titulo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Título Tarea:</label>
        <br></br>
        <input
            type="text"
            name="titulo" 
            value={formDatos.titulo}
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
          value={formDatos.responsable}
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
          value={formDatos.fecha} 
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

export default FormTarea;