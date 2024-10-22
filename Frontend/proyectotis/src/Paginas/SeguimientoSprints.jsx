import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Componentes/UserContext';
import './AreaEstudiante.scss';
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateralEstudiante';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Modal from '../Componentes/Modal';
import { Modal as Recuadro, Button, Form } from 'react-bootstrap'; // Usamos Bootstrap para los modales
import { FaEdit } from 'react-icons/fa'; // Icono de editar

export default function SeguimientoSprints() {
  const { user } = useUser();
  const [sprints, setSprints] = useState([]); // Estado para almacenar los sprints
  const [selectedSprint, setSelectedSprint] = useState(null); // Sprint seleccionado para los modales
  const [showStateModal, setShowStateModal] = useState(false); // Mostrar modal para el estado
  const [showEditModal, setShowEditModal] = useState(false); // Mostrar modal para modificar
  const [grupoEmpresa, setGrupoEmpresa] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.idGrupoEmpresa) {
      fetchSprints();
      fetchGrupo();
    } else {
      console.error('user o idGrupoEmpresa no están definidos');
    }
  }, [user]); // Asegúrate de que el efecto se ejecute cuando user cambie

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
      console.log('Datos sprint:', result);
      if (result.success !== undefined && result.success) {
        const sprintData = result.sprint;
        console.log('idgrupo:', user.idGrupoEmpresa);
        if (!sprintData) {
          console.error('No se encontró información de sprint.');
          return;
        } else {
          let sprintData = result.sprint;
          sprintData = sprintData.sort((a, b) => a.idSprint - b.idSprint);
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


  const fetchHU = async (sprintId) => {
    try {
      const response = await fetch('http://localhost/ProyectoTis/Backend/obtenerHU.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idGrupoEmpresa: user.idGrupoEmpresa, Sprint_idSprint: sprintId })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la respuesta del servidor:', errorText);
        throw new Error("Error en la respuesta del servidor.");
      }     
      const result = await response.json();
      console.log('Datos HU:', result);
      if (result.success) {
        return result.HU;
      } else {
        console.log('No se encontraron HU');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener las HU:', error);
      return [];
    }
  };

  const fetchGrupo = async () => {
    try {
      const response = await fetch('http://localhost/ProyectoTis/Backend/obtenerGrupoEmpresa.php', {
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
      console.log('Datos GrupoEmpresa:', result);
      if (result.success !== undefined && result.success) {
        const GrupoData = result.GrupoEmpresa;
        console.log('idgrupo:', user.idGrupoEmpresa);
        if (!GrupoData) {
          console.error('No se encontró información de GrupoEmpresa.');
          return;
        } else {
          setGrupoEmpresa(GrupoData);
        }
      } else {
        console.error(result.message || 'Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al obtener los datos de la GrupoEmpresa:', error);
      setModal({
        show: true,
        title: 'Error',
        message: error.message || 'Hubo un problema al obtener los datos de la grupo Empresa.'
      });  
    }
  };
  
  const idJefe=  grupoEmpresa ? grupoEmpresa.idEstudianteScrum : null;

  const calculateProgress = async (sprintId) => {
    const huData = await fetchHU(sprintId);
    const completadasHU = huData.filter(hu => hu.estado === 'Terminado').length;
    const totalHU = huData.length;
    return totalHU > 0 ? `${completadasHU}/${totalHU}` : '--'; // Devolver el progreso como "completadas/total"
  };

  const loadProgress = async () => {
    const updatedSprints = await Promise.all(sprints.map(async (sprint) => {
      const progreso = await calculateProgress(sprint.idSprint); // Calcular progreso
      return {
        ...sprint,
        progreso // Añadir el progreso calculado al sprint
      };
    }));
    setSprints(updatedSprints); // Actualizar el estado de los sprints con el progreso
  };

  useEffect(() => {
    if (sprints.length > 0) {
      loadProgress(); // Cargar el progreso una vez que los sprints están cargados
    }
  }, [sprints.length]);

  const handleStateChange = (sprint, newState) => {
    const currentIndex = sprints.findIndex(s => s.idSprint === sprint.idSprint);
    const SprintsAnteriores = sprints.slice(0, currentIndex);
    
    if (newState === 'En progreso') {
      const otroEnProgreso = sprints.some(s => s.estado === 'En progreso');
      if (otroEnProgreso) {
        setModal({
          show: true,
          title: 'Estado Invalido',
          message: 'Solo un sprint puede estar en estado "En progreso".'
      });
        return;
      }
      const PreviosCompletados = SprintsAnteriores.every(s => s.estado === 'Terminado');
      if (!PreviosCompletados) {
        alert('Todos los sprints anteriores deben estar en estado "Terminado" para cambiar este sprint a "En progreso".');
        return;
      }
    }
    setSelectedSprint({ ...sprint, estado: newState });
    setShowStateModal(true); 
    fetchSprints();
  };

  // Función para manejar la edición de un sprint
  const handleEditClick = (sprint) => {
    setSelectedSprint(sprint);
    setShowEditModal(true); 
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
        await fetchSprints();
        await loadProgress();
      } else {
        console.log('No se pudo guardar el estado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);    
    }  
  };

  const getMinStartDate = () => {
    const previousSprints = sprints.filter(s => s.idSprint !== selectedSprint?.idSprint);
    const lastSprint = previousSprints.reduce((prev, current) => 
      (new Date(prev.fechaFin) > new Date(current.fechaFin)) ? prev : current, previousSprints[0]);

    return lastSprint ? lastSprint.fechaFin : new Date().toISOString().split("T")[0]; // fecha actual si no hay sprints anteriores
  };

  // Función para guardar la modificación del sprint
  const saveEditSprint = async (e) => {
    e.preventDefault();
    const updatedSprint = {
      idSprint: selectedSprint.idSprint,
      fechaInicio:selectedSprint.fechaInicio,
      fechaFin:selectedSprint.fechaFin
    };
    console.log('datos modificados:', updatedSprint);
    if (new Date(selectedSprint.fechaInicio) > new Date(selectedSprint.fechaFin)) {
      setModal({
        show: true,
        title: 'Fechas invalidas',
        message: 'La fecha de inicio no puede ser mayor que la fecha de fin.'
      });
      return;
    }else{
    try {
      const response = await fetch('http://localhost/ProyectoTis/Backend/modificarSprint.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify(updatedSprint),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Obtener el texto de error
        console.error('Error en la respuesta del servidor:', errorText);
        throw new Error("Error en la respuesta del servidor.");
      }

      const result = await response.json();
      if (result.success) {
        console.log(`Guardando modificación para ${selectedSprint.nomSprint}`);
        setShowEditModal(false);
        await fetchSprints();
        await loadProgress();
      } else {
        console.log('No se pudo guardar datos modificados');
      }
    } catch (error) {
      console.error('Error al modificar el sprint:', error);
    }
  }
  };

  const handleSprintClick = (idSprint, nomSprint, fechaInicio, fechaFin, idJefe) => {
    // Navegar a SeguimientoActividades con idSprint y nomSprint como parámetros
    navigate(`/SeguimientoActividades/${idSprint}/${nomSprint}/${fechaInicio}/${fechaFin}/${idJefe}`);
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
            <div>
              <h2 className='TITULO'>Seguimiento de Sprints</h2>
            </div>
            <div>
              <h2 className='NOMgrupo'>Número de Sprints: {sprints.length}</h2>
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
                {sprints.map((sprint) => (
                  <tr key={sprint.idSprint}>
                    <td>
                      <button 
                        className="btn-link" 
                        onClick={() => handleSprintClick(sprint.idSprint, sprint.nomSprint, sprint.fechaInicio, sprint.fechaFin, idJefe || 0)}
                      >
                        {sprint.nomSprint}
                      </button>
                    </td>
                    <td>
                      <select
                        className='estado'
                        value={sprint.estado}
                        onChange={(e) => handleStateChange(sprint, e.target.value)}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Terminado">Terminado</option>
                      </select>
                    </td>
                    <td>{sprint.progreso} HU</td>
                    <td>{sprint.fechaInicio}</td>
                    <td>{sprint.fechaFin}</td>
                    <td>
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
      <Recuadro show={showStateModal} onHide={() => setShowStateModal(false)}>
        <Recuadro.Header closeButton>
          <Recuadro.Title>Guardar Estado</Recuadro.Title>
        </Recuadro.Header>
        <Recuadro.Body>
          ¿Desea guardar el estado "{selectedSprint?.estado}" para el {selectedSprint?.nomSprint}?
        </Recuadro.Body>
        <Recuadro.Footer>
          <Button variant="secondary" onClick={() => setShowStateModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={saveNewState}>Guardar</Button>
        </Recuadro.Footer>
      </Recuadro>

      <Recuadro show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Recuadro.Header closeButton>
          <Recuadro.Title>Modificar Sprint</Recuadro.Title>
        </Recuadro.Header>
        <Recuadro.Body>
          <Form>
              <Form.Group>
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control 
                  type="date" 
                  value={selectedSprint?.fechaInicio} 
                  min={selectedSprint?.fechaInicio}
                  onChange={(e) => setSelectedSprint({ ...selectedSprint, fechaInicio: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de Fin</Form.Label>
                <Form.Control 
                  type="date" 
                  value={selectedSprint?.fechaFin || ''} 
                  min={selectedSprint?.fechaInicio || getMinStartDate()}
                  onChange={(e) => setSelectedSprint({ ...selectedSprint, fechaFin: e.target.value })}
                />
              </Form.Group>
          </Form>
        </Recuadro.Body>
        <Recuadro.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={saveEditSprint}>Modificar</Button>
        </Recuadro.Footer>
      </Recuadro>
      <Copyright />
    </>
  );
}
