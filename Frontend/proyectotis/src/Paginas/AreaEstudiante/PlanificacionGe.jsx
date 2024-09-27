import React, { useState } from 'react';
import { GoPlus, GoDash } from "react-icons/go";
import Sprint from '../../Componentes/ComponentesEst/Sprint';
import './AreaEstudiante.scss';

export const PlanificacionGE = () => {
  const [count, setCount] = useState(0)
  const [sprints, setSprints] = useState([]); // Estado para almacenar los sprints

  const addSprint = () => {
    const newSprintNumber = sprints.length + 1; // Número del nuevo sprint
    setSprints([...sprints, `Sprint ${newSprintNumber}`]); // Añadir nuevo sprint al estado
    setCount(count + 1);
  };
  const deleteLastSprint = () => {
    setSprints(sprints.slice(0, -1)); // Eliminar el último sprint
    setCount(count - 1)
  };
  return (
    <main>
    <div className='Plani'>
      <div className='Planificacion'>
        <div className='titulo'>
          <h2>Planificación de Actividades</h2>
        </div>
        <div className='NumSprint'>
          <div className="bt">
            <h1 >Número de Sprints totales</h1>
            <button onClick={deleteLastSprint} className="DecremBtn"> 
                <GoDash/>
            </button>
            <label className="Contador">{count}</label>
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
    </main>
  )
}