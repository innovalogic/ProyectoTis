import React, { useState, useEffect } from 'react';
import { useUser } from '../Componentes/UserContext';
import './AreaEstudiante.scss';
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateralEstudiante';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Modal from '../Componentes/Modal'
import { Modal as Recuadro, Button, Form } from 'react-bootstrap'; // Usamos Bootstrap para los modales
import { FaEdit } from 'react-icons/fa'; // Icono de editar
import { useParams } from 'react-router-dom';

export default function SeguimientoActividades() {
  const {idSprint, nomSprint, fechaInicio, fechaFin, idEstudianteScrum} = useParams();
  const { user } = useUser();
  const [hus, setHus] = useState([]); // Estado para almacenar los sprints
  const [tareas, setTareas] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [selectedHU, setSelectedHU] = useState(null); // Sprint seleccionado para los modales
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [showStateModalHU, setShowStateModalHU] = useState(false);
  const [showStateModalTarea, setShowStateModalTarea] = useState(false); // Mostrar modal para el estadotarea
  const [showEditModalHU, setShowEditModalHU] = useState(false); // Mostrar modal para modificar hu
  const [showEditModalTarea, setShowEditModalTarea] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
  });
  
  useEffect(() => {
    if (user && user.idGrupoEmpresa) {
      fetchHU();
      fetchResponsables();
    } else {
      console.error('user o idGrupoEmpresa no están definidos');
    }
  }, [user]); // Asegúrate de que el efecto se ejecute cuando user cambie

  const fetchHU = async () => {
    try {
      const response = await fetch('https://tis-e8f3f498eaee.herokuapp.com/obtenerHU.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idGrupoEmpresa: user.idGrupoEmpresa,Sprint_idSprint:idSprint })  // Enviar el idGrupoEmpresa
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        console.error('Error en la respuesta del servidor:', errorText);
        throw new Error("Error en la respuesta del servidor.");
      }
      const result = await response.json();
      console.log('Data:', result);
      if (result.success !== undefined && result.success) {
        const HUData = result.HU;
        console.log('idgrupo:', user.idGrupoEmpresa);
        if (!HUData) {
          console.error('No se encontró información de HU de el sprint.');
          return;
        } else {
          setHus(HUData);
          setTareas([]);
          fetchTareas(HUData.map(hu => hu.idHU))
          console.log('idHU enviados:',HUData.map(hu => hu.idHU))
        }
      } else {
        console.error(result.message || 'Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al obtener los datos de las HU:', error);
      setModal({
        show: true,
        title: 'Error',
        message: error.message || 'Hubo un problema al obtener los datos de las HU.'
      });  
    }
  };

  const fetchTareas = async (huIds) => {
    console.log('idHU recibidos:', huIds)
    try {
      let allTareas = [];
      for (const huId of huIds) {
        const response = await fetch('https://tis-e8f3f498eaee.herokuapp.com/obtenerTarea.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idGrupoEmpresa: user.idGrupoEmpresa, HU_idHU: huId }),
        });

        const result = await response.json();
        if (result.success) {
          allTareas = [...allTareas, ...result.Tarea];
        }
      }
      const uniqueTareas = allTareas.filter(
        (tarea, index, self) => index === self.findIndex(t => t.idTarea === tarea.idTarea)
      );
      console.log('Tareas únicas:', uniqueTareas);  
      setTareas(uniqueTareas); // Actualizar el estado con tareas únicas
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const fetchResponsables = async () => {
    const dataToSend = {
      idGrupoEmpresa: user.idGrupoEmpresa,
      nomSprint: nomSprint,
    };
    console.log('datos:', dataToSend);
    try {
      const response = await fetch('https://tis-e8f3f498eaee.herokuapp.com/llamadas.php', {
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
      console.error('Error al obtener responsables:', error);
    }
  };

  const handleStateChangeHU = (hu, newState) => {
    if (newState === "Terminado") {
      const tareasDeHU = tareas.filter(tarea => tarea.HU_idHU === hu.idHU);
      const todaTareaTerminada = tareasDeHU.every(tarea => tarea.estado === "Terminado");
  
      if (!todaTareaTerminada) {
        setModal({
          show: true,
          title: 'Error',
          message: 'No puedes marcar la HU como "Terminada" hasta que todas sus tareas estén terminadas.'
        });
        return;
      }
    }
    setSelectedHU({ ...hu, estado: newState });
    setShowStateModalHU(true); 
  };

  const handleStateChangeTarea = (tarea, newState) => {
    setSelectedTarea({ ...tarea, estado: newState });
    setShowStateModalTarea(true); 
  };

  // Función para guardar el nuevo estado de la HU
  const saveNewStateHU = async (e) => {
    e.preventDefault();
    const dataToSend = {
      idHU: selectedHU.idHU,
      idGrupoEmpresa: user.idGrupoEmpresa,
      estado: selectedHU.estado,
    };
    console.log('datos:', dataToSend);
    try {
      const response = await fetch('https://tis-e8f3f498eaee.herokuapp.com/estadoHU.php', {
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
        console.log(`Guardando estado: "${selectedHU.estado}" para la HU ${selectedHU.titulo}`);
        setShowStateModalHU(false);
        fetchHU();
      } else {
        console.log('No se pudo guardar el estado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);    
    }  
  };

  const saveNewStateTarea = async (e) => {
    e.preventDefault();
    const dataToSend = {
      idTarea: selectedTarea.idTarea,
      idGrupoEmpresa: user.idGrupoEmpresa,
      estado: selectedTarea.estado,
    };
    console.log('datos:', dataToSend);
    try {
      const response = await fetch('https://tis-e8f3f498eaee.herokuapp.com/estadoTarea.php', {
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
        console.log(`Guardando estado: "${selectedTarea.estado}" para la Tarea ${selectedTarea.titulo}`);
        setShowStateModalTarea(false);
        fetchHU();
      } else {
        console.log('No se pudo guardar el estado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);    
    }  
  };

  const handleEditClickHU = (hu) => {
    setSelectedHU(hu);
    setShowEditModalHU(true);
  };

  const handleEditClickTarea = (tarea) => {
    setSelectedTarea(tarea);
    setShowEditModalTarea(true);
  };

  const saveEditHU = async () => {
    try {
      const response = await fetch('https://tis-e8f3f498eaee.herokuapp.com/modificarHU.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idHU: selectedHU.idHU, titulo: selectedHU.titulo, fechaEntrega: selectedHU.fechaEntrega, responsable: selectedHU.responsable }),
      });

      const result = await response.json();
      if (result.success) {
        setShowEditModalHU(false);
        fetchHU();
      }
    } catch (error) {
      console.error('Error al guardar los cambios de la HU:', error);
    }
  };

  const saveEditTarea = async () => {
    try {
      const response = await fetch('https://tis-e8f3f498eaee.herokuapp.com/modificarTarea.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idTarea: selectedTarea.idTarea, titulo: selectedTarea.titulo, fechaEntrega: selectedTarea.fechaEntrega, responsable: selectedTarea.responsable }),
      });

      const result = await response.json();
      if (result.success) {
        setShowEditModalTarea(false);
        fetchHU();
      }
    } catch (error) {
      console.error('Error al guardar los cambios de tarea:', error);
    }
  };

  const calculateProgress = (huId) => {
    const tareasDeHU = tareas.filter(tarea => tarea.HU_idHU === huId);
    const totalTareas = tareasDeHU.length;
    const tareasTerminadas = tareasDeHU.filter(tarea => tarea.estado === 'Terminado').length;
    return totalTareas > 0 ? `${tareasTerminadas}/${totalTareas}` : '--';
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
              <h2 className='TITULO'>Seguimiento de Actividades</h2>
            </div>
            <div>
              <h2 className='NOMgrupo'>{nomSprint}</h2>
            </div>
            <div>
              <h2 className='NOMgrupo'>Número de HU: {hus.length}</h2>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Estado</th>
                  <th>Progreso</th>
                  <th>Entrega</th>
                  <th>Responsable</th>
                  <th>Modificar</th>
                </tr>
              </thead>
              <tbody>
                {hus.map((hu) => (
                  <React.Fragment key={`hu-${hu.idHU}`}> 
                    <tr key={`hu-${hu.idHU}`}>
                      <td>{hu.titulo}</td>
                      <td>
                        <select
                          className='estado'
                          value={hu.estado}
                          onChange={(e) => handleStateChangeHU(hu, e.target.value)}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En progreso">En progreso</option>
                          <option value="Terminado">Terminado</option>
                        </select>
                      </td>
                      <td>{calculateProgress(hu.idHU)} Tareas</td>
                      <td>{hu.fechaEntrega}</td>
                      <td>{hu.responsable}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => handleEditClickHU(hu)}>
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                    {tareas.filter(tarea => tarea.HU_idHU === hu.idHU).map(tarea => (
                      <tr key={`tarea-${hu.idHU}-${tarea.idTarea}`}>
                        <td>-- {tarea.titulo}</td>
                        <td>
                        <select
                          className='estado'
                          value={tarea.estado}
                          onChange={(e) => handleStateChangeTarea(tarea, e.target.value)}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En progreso">En progreso</option>
                          <option value="Terminado">Terminado</option>
                        </select>
                        </td>
                        <td>--</td>
                        <td>{tarea.fechaEntrega}</td>
                        <td>{tarea.responsable}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => handleEditClickTarea(tarea)}>
                            <FaEdit />
                          </button>
                        </td>
                      </tr>
                    ))}  
                  </React.Fragment>
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
      <Recuadro show={showStateModalHU} onHide={() => setShowStateModalHU(false)}>
        <Recuadro.Header closeButton>
          <Recuadro.Title>Guardar Estado</Recuadro.Title>
        </Recuadro.Header>
        <Recuadro.Body>
          ¿Desea guardar el estado "{selectedHU?.estado}" para la HU {selectedHU?.titulo}?
        </Recuadro.Body>
        <Recuadro.Footer>
          <Button variant="secondary" onClick={() => setShowStateModalHU(false)}>Cancelar</Button>
          <Button variant="primary" onClick={saveNewStateHU}>Guardar</Button>
        </Recuadro.Footer>
      </Recuadro>

      <Recuadro show={showStateModalTarea} onHide={() => setShowStateModalTarea(false)}>
        <Recuadro.Header closeButton>
          <Recuadro.Title>Guardar Estado</Recuadro.Title>
        </Recuadro.Header>
        <Recuadro.Body>
          ¿Desea guardar el estado "{selectedTarea?.estado}" para la Tarea {selectedTarea?.titulo}?
        </Recuadro.Body>
        <Recuadro.Footer>
          <Button variant="secondary" onClick={() => setShowStateModalTarea(false)}>Cancelar</Button>
          <Button variant="primary" onClick={saveNewStateTarea}>Guardar</Button>
        </Recuadro.Footer>
      </Recuadro>

      <Recuadro show={showEditModalHU} onHide={() => setShowEditModalHU(false)}>
          <Recuadro.Header closeButton>
            <Recuadro.Title>Editar HU</Recuadro.Title>
          </Recuadro.Header>
          <Recuadro.Body>
            <Form>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" value={selectedHU?.titulo} onChange={(e) => setSelectedHU({ ...selectedHU, titulo: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de Entrega</Form.Label>
                <Form.Control type="date" value={selectedHU?.fechaEntrega} 
                onChange={(e) => setSelectedHU({ ...selectedHU, fechaEntrega: e.target.value })} 
                min={fechaInicio}
                max={fechaFin} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Responsable</Form.Label>
                <Form.Control as="select" value={selectedHU?.responsable} 
                  onChange={(e) => setSelectedHU({ ...selectedHU, responsable: e.target.value })}>
                  {responsables.map(responsable => (
                    <option key={responsable.id} value={responsable.id}>{responsable.nombre_completo}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Recuadro.Body>
          <Recuadro.Footer>
            <Button variant="secondary" onClick={() => setShowEditModalHU(false)}>Cancelar</Button>
            <Button variant="primary" onClick={saveEditHU}>Guardar</Button>
          </Recuadro.Footer>
        </Recuadro>

        <Recuadro show={showEditModalTarea} onHide={() => setShowEditModalTarea(false)}>
          <Recuadro.Header closeButton>
            <Recuadro.Title>Modificar Tarea</Recuadro.Title>
          </Recuadro.Header>
          <Recuadro.Body>
            <Form>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" value={selectedTarea?.titulo} onChange={(e) => setSelectedTarea({ ...selectedTarea, titulo: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de Entrega</Form.Label>
                <Form.Control type="date" value={selectedTarea?.fechaEntrega} 
                onChange={(e) => setSelectedTarea({ ...selectedTarea, fechaEntrega: e.target.value })} 
                min={fechaInicio}  // fecha de entrega de la HU
                max={selectedHU?.fechaEntrega}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Responsable</Form.Label>
                <Form.Control as="select" value={selectedTarea?.responsable} 
                  onChange={(e) => setSelectedTarea({ ...selectedTarea, responsable: e.target.value })}>
                  {responsables.map(responsable => (
                    <option key={responsable.id} value={responsable.id}>{responsable.nombre_completo}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Recuadro.Body>
          <Recuadro.Footer>
            <Button variant="secondary" onClick={() => setShowEditModalTarea(false)}>Cancelar</Button>
            <Button variant="primary" onClick={saveEditTarea}>Guardar</Button>
          </Recuadro.Footer>
        </Recuadro>
      <Copyright />
    </>
  );
}
