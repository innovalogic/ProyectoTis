import React, { useState, useEffect } from 'react';
import { useUser } from '../Componentes/UserContext';
import './AreaEstudiante.scss';
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateralEstudiante';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Modal from '../Componentes/Modal';
import axios from 'axios';

export default function MostrarNotaFinal () {
  const { user } = useUser();
  const idGrupo = user ? user.idGrupoEmpresa : null; 
  const idEstudiante= user ? user.idEstudiante : null; 
  const [notaPromedio, setNotaPromedio] = useState(null);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
  });

  const closeModal = () => {
    setModal({
        ...modal,
        show: false
    });
  };

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      console.log("GrupoEmpresa ID: ", user.idGrupoEmpresa);  // Verificar si tiene el valor correcto
      try {
          const response = await axios.post('http://innovalogic.tis.cs.umss.edu.bo/obtenerEvaluacionFinal.php', {
              grupoempresa_idgrupoempresa: user.idGrupoEmpresa,
          });
          console.log("Respuesta de la API:", response.data);
        if (response.data?.success && response.data?.evaluacionFinal) {
          // Buscar la evaluación con idevaluado === idEstudiante
          const evaluacionEncontrada = response.data.evaluacionFinal.find(
            evaluacion => evaluacion.idevaluado === idEstudiante
          );

          if (evaluacionEncontrada) {
            setNotaPromedio(evaluacionEncontrada.notaPromedio);
            setError(null);
          } else {
            setNotaPromedio(null);
            setError('No se encontró una calificación para el estudiante');
          }
        } else {
          setError(response.data?.message || 'No se encontraron evaluaciones.');
        }
      } catch (error) {
        console.error('Error al obtener evaluaciones:', error.message);
        setError('Hubo un problema al conectarse al servidor');
      }
    };

    if (idGrupo && idEstudiante) {
      fetchEvaluaciones();
    }
  }, [idGrupo, idEstudiante]);

  return (
    <>
      <NavbarInicioDeSesion />
      <div style={{ display: 'flex', height: 'calc(-110px + 100vh)', marginTop: '70px'}}>   
      <BarraLateral/>
        <div className='Plani'>
          <div className='Planificacion'>
            <div className='titulo'>
              <h2>Nota Evaluación Final</h2>
            </div>
            <div className='NumSprint'>
              {notaPromedio !== null ? (
                <h3>Su calificación final es de {notaPromedio}</h3>
              ) : error ? (
                <h3 className="text-red-500">{error}</h3>
              ) : (
                <h3>Cargando calificación...</h3>
              )}
            </div>
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