import React, { useState, useEffect } from 'react';
import { useUser } from '../Componentes/UserContext';
import './AreaEstudiante.scss';
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateralEstudiante';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import { Modal, Button } from 'react-bootstrap'; // Usamos Bootstrap para los modales
import { FaEdit } from 'react-icons/fa'; // Icono de editar

export default function SeguimientoSprints() {
  const { user } = useUser();
  const [sprints, setSprints] = useState([]); // Estado para almacenar los sprints
  const [selectedSprint, setSelectedSprint] = useState(null); // Sprint seleccionado para los modales
  const [showStateModal, setShowStateModal] = useState(false); // Mostrar modal para el estado
  const [showEditModal, setShowEditModal] = useState(false); // Mostrar modal para modificar
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
  });
  
  // Simulación de obtener datos de la base de datos (usa fetch o axios en tu caso)
  useEffect(() => {
    if (user && user.idGrupoEmpresa) { // Verifica si user e idGrupoEmpresa están definidos
      const fetchSprints = async () => {
        try {
          const response = await fetch('http://localhost/ProyectoTis/Backend/obtenerSprint.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idGrupoEmpresa: user.idGrupoEmpresa })  // Enviar el idGrupoEmpresa
          });
  
          if (!response.ok) {
            const errorText = await response.text(); // Obtener el texto del error
            console.error('Error en la respuesta del servidor:', errorText);
            throw new Error("Error en la respuesta del servidor.");
          }
  
          const result = await response.json();
          console.log('Data:', result);
  
          if (result.success !== undefined && result.success) {
            const sprintData = result.sprint;
            console.log('idgrupo:', user.idGrupoEmpresa);
            if (!sprintData) {
              console.error('No se encontró información de sprint.');
              return;
            } else {
              setSprints(sprintData);
            }
          } else {
            console.error(result.message || 'Error en la respuesta del servidor');
          }
        } catch (error) {
          console.error('Error al obtener los datos del Sprint:', error);
          setModal({
            show: true,
            title: 'Error',
            message: error.message || 'Hubo un problema al obtener los datos del Sprint.'
          });  
        }
      };
  
      fetchSprints();
    } else {
      console.error('user o idGrupoEmpresa no están definidos');
    }
  }, [user]); // Asegúrate de que el efecto se ejecute cuando user cambie
  

  // Función para manejar la selección de un estado en el combo box
  const handleStateChange = (sprint, newState) => {
    setSelectedSprint({ ...sprint, estado: newState });
    setShowStateModal(true); // Mostrar modal
  };

  // Función para manejar la edición de un sprint
  const handleEditClick = (sprint) => {
    setSelectedSprint(sprint);
    setShowEditModal(true); // Mostrar modal
  };

  // Función para guardar el nuevo estado del sprint
  const saveNewState = async (e) => {
    e.preventDefault();
    const dataToSend = {
      idSprint: selectedSprint.idSprint,
      idGrupoEmpresa: user.idGrupoEmpresa,
      estado: selectedSprint.estado,
    };
    console.log('datos:', dataToSend);
    try {
      const response = await fetch('http://localhost/ProyectoTis/Backend/estadoSprint.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend) // Enviar idGrupoEmpresa
      });
      if (!response.ok) {
        const errorText = await response.text(); // Obtener el texto de error
        console.error('Error en la respuesta del servidor:', errorText);
        throw new Error("Error en la respuesta del servidor.");
      }

      const result = await response.json();
      if (result.success) {
        console.log(`Guardando estado: "${selectedSprint.estado}" para el  ${selectedSprint.nomSprint}`);
        setShowStateModal(false);
      } else {
        console.log('No se pudo guardar el estado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error); 
        
    }
    
    
  };

  // Función para guardar la modificación del sprint
  const saveEditSprint = () => {
    // Aquí debes implementar la lógica para modificar el sprint en la base de datos
    setShowEditModal(false);
    console.log(`Modificando sprint: ${selectedSprint.nombre}`);
  };

  const closeModal = () => {
    setModal({
        ...modal,
        show: false
    });
};

  return (
    <>
      <NavbarInicioDeSesion />
      <div style={{ display: 'flex', height: '100%', marginTop: '70px'}}>   
        <BarraLateral />
        <div className='seguimiento'>
          <div className='SeguiSprint'>
            <div className='TITULO'>
              <h2>Seguimiento de Sprints</h2>
            </div>
            <div className='NOMgrupo'>
              <h2>Nombre de la Grupo Empresa:</h2>
            </div>
            <div className='NOMgrupo'>
              <h2>Número de Sprints: {sprints.length}</h2>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Progreso</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Modificar</th>
                </tr>
              </thead>
              <tbody>
                {sprints.map((sprint, index) => (
                  <tr key={index}>
                    <td>
                      {/* El nombre del sprint como un botón que redirige */}
                      <button 
                        className="btn-link" 
                        onClick={() => window.location.href = `/sprint/${sprint.id}`}
                      >
                        {sprint.nomSprint}
                      </button>
                    </td>
                    <td>
                      {/* Combo box para seleccionar el estado */}
                      <select
                        value={sprint.estado}
                        onChange={(e) => handleStateChange(sprint, e.target.value)}
                      >
                        <option value="Definir">Definir</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Terminado">Terminado</option>
                      </select>
                    </td>
                    <td>{sprint.progreso}%</td>
                    <td>{sprint.fechaInicio}</td>
                    <td>{sprint.fechaFin}</td>
                    <td>
                      {/* Botón de editar con un icono */}
                      <button className="btn btn-primary" onClick={() => handleEditClick(sprint)}>
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          
        </div>
        <Modal
        show={modal.show}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
      />
      </div>

      {/* Modal para confirmar cambio de estado */}
      <Modal show={showStateModal} onHide={() => setShowStateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Guardar Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Desea guardar el estado "{selectedSprint?.estado}" para el {selectedSprint?.nomSprint}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStateModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={saveNewState}>Guardar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar la modificación */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Sprint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Desea modificar el sprint "{selectedSprint?.nombre}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={saveEditSprint}>Modificar</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modal.show}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
      />

      <Copyright />
    </>
  );
}
