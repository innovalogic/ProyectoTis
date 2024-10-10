import React, { useState } from 'react';
import { GoPlus, GoDash } from "react-icons/go";
import Sprint from '../Componentes/ComponentesEst/Sprint';
import './AreaEstudiante.scss';
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateral';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
 export default function PlanificacionGE () {
  const [sprints, setSprints] = useState([]); // Estado para almacenar los sprints

  const addSprint = () => {
    const newSprintNumber = sprints.length + 1; // Número del nuevo sprint
    setSprints([...sprints, `Sprint ${newSprintNumber}`]); // Añadir nuevo sprint al estado
  };
  const deleteLastSprint = () => {
    if (sprints.length > 0) {
      setSprints(sprints.slice(0, -1)); // Eliminar el último sprint
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
                <button onClick={deleteLastSprint} className="DecremBtn" disabled={sprints.length === 0}> 
                    <GoDash/>
                </button>
                <label className="Contador">{sprints.length}</label>
                <button onClick={addSprint} className="IncremBtn"> 
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
        </div>
      </div> 
      
          <Copyright />
           
    </>
  )
}