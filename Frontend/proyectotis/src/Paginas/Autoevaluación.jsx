import React, { useState } from 'react';
import { useUser } from '../Componentes/UserContext';
import './AreaEstudiante.scss';
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateralEstudiante';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Modal from '../Componentes/Modal';

export default function Autoevaluacion() {
  const { user } = useUser();
  
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
  });

  // Array con criterios de evaluación
  const criterios = [
    "Cumplimiento de tareas asignadas",
    "Comunicación con el equipo",
    "Resolución de problemas",
    "Responsabilidad en plazos",
    "Adaptabilidad a cambios"
    // Puedes agregar más criterios aquí
  ];

  // Estado para guardar las respuestas de los criterios
  const [respuestas, setRespuestas] = useState(
    criterios.map(() => null) // Inicializa con null para cada criterio
  );

  // Función para manejar la selección de radio buttons
  const handleRadioChange = (index, value) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = value;
    setRespuestas(nuevasRespuestas);
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
      <div style={{ display: 'flex', height: '100%', marginTop: '70px' }}>
        <BarraLateral />
        <div className='evaluacion'>
          <div className='final'>
            <div>
              <h2 className='tit'>Evaluación final</h2>
            </div>
            <div>
              <h2 className='descripcion'>
                Para la evaluación final de la empresa el docente designo la AUTOEVALUACIÓN, por lo cual deberas evaluarte bajo los criterios de la siguiente planilla.
              </h2>
              <h2 className='descripcion'>
                La planilla usa una escala de frecuencia en la que debe guiarse con el trabajo que realizaste a lo largo del proyecto para calificar los diferentes criterios de la evaluación; se usaran las siguientes casillas:
              </h2>
              <h2 className='casillas'>
                1: Nunca
                2: Raramente
                3: A veces
                4: Frecuentemente
                5: Siempre
              </h2>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Criterios</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                </tr>
              </thead>
              <tbody>
                {criterios.map((criterio, index) => (
                  <tr key={index}>
                    <td>{criterio}</td>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <td key={value}>
                        <input
                          type="radio"
                          name={`criterio-${index}`}
                          value={value}
                          checked={respuestas[index] === value}
                          onChange={() => handleRadioChange(index, value)}
                        />
                      </td>
                    ))}
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
      <Copyright />
    </>
  );
}
