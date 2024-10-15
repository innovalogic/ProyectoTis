import React, { useState } from 'react';
import { GoPlus, GoDash } from "react-icons/go";
import { useUser } from '../Componentes/UserContext';
import Sprint from '../Componentes/ComponentesEst/Sprint';
import './AreaEstudiante.scss';
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateralEstudiante';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Modal from '../Componentes/Modal';
import { useNavigate } from "react-router-dom";

export default function PlanificacionGE () {
  const [sprints, setSprints] = useState([]); // Estado para almacenar los sprints
  const maxSprints = 4;
  const { user } = useUser();
  const idGrupo = user ? user.idGrupoEmpresa : null; 
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
  });
  const addSprint = () => {
    if (sprints.length < maxSprints) {
      const newSprintNumber = sprints.length + 1; // Número del nuevo sprint
      setSprints([...sprints, `Sprint ${newSprintNumber}`]); // Añadir nuevo sprint al estado
    }
  };
  const deleteLastSprint = () => {
    if (sprints.length > 0) {
      setSprints(sprints.slice(0, -1)); // Eliminar el último sprint
    }
  };

  const savePlanificacion =  async (e) => {
    e.preventDefault();
    console.log('idgrupo:', idGrupo);
    try {
      const response = await fetch('http://localhost/ProyectoTis/Backend/planificaciontrue.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idGrupo: idGrupo }) // Enviar idGrupoEmpresa
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
          title: 'Planificación guardada',
          message: 'La Planificación se guardo con exito .'
      });
      } else {
        setModal({
          show: true,
          title: 'Error al guardar planificación',
          message: result.message
      });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error); 
        setModal({
          show: true,
          title: 'Error',
          message: 'Hubo un problema al guardar planificación.'
        });
    }
  };

  const closeModal = () => {
    setModal({
        ...modal,
        show: false
    });

    if (modal.title === 'Planificación guardada') {
        navigate('/SeguimientoSprints');
    }
};
  return (
    <>
      <NavbarInicioDeSesion />
      <div style={{ display: 'flex', height: '100%', marginTop: '70px'}}>   
      <BarraLateral/>
        <div className='Plani'>
          <div className='Planificacion'>
            <div className='titulo'>
              <h2>Planificación de Actividades</h2>
            </div>
            <div className='NumSprint'>
              <div className="bt">
                <h3 >Número de Sprints totales</h3>
                <button 
                  onClick={deleteLastSprint} 
                  className="DecremBtn" 
                  disabled={sprints.length === 0}
                  > 
                    <GoDash/>
                </button>
                <label className="Contador">{sprints.length}</label>
                <button
                  onClick={addSprint} 
                  className="IncremBtn"
                  disabled={sprints.length >= maxSprints}
                > 
                    <GoPlus/>
                </button>
              </div>
              <div className='SP'>
                {sprints.map((sprint, index) => (
                  <Sprint key={index} title={sprint} />
                ))}
              </div>
            </div>
          </div>
          <div className='Guardar'>
            <button 
              onClick={savePlanificacion} 
              disabled={sprints.length < 3} // Deshabilitado si no hay 4 sprints
              className='guardaP'
            >
              Guardar planificación
            </button>
          </div>
        </div>
        <Modal
        show={modal.show}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
      />
      </div> 
      
          <Copyright />
           
    </>
  )
}