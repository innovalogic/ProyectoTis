import React, { useState, useEffect } from 'react';
import { useUser } from '../Componentes/UserContext';
import './AreaEstudiante.scss';
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateralEstudiante';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Modal from '../Componentes/Modal';

export default function EvaluacionCruzada() {
  const { user } = useUser();
  const [tiposEvaluaciones, setTiposEvaluaciones] = useState([]);
  const [criterios, setCriterios] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
  });

  useEffect(() => {
    fetch("https://tis-e8f3f498eaee.herokuapp.com/obtenerTipoEvaluacion.php")
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
              setTiposEvaluaciones(data.tiposEvaluaciones);
            }
        })
        .catch((error) => console.error("Error al cargar tipos de evaluación:", error));
  }, []);

  const cargarCriterios = () => {
      fetch("https://tis-e8f3f498eaee.herokuapp.com/obtenerCriterios.php")
          .then((response) => response.json())
          .then((data) => {
              if (data.success) {
                const tipoAutoEvaluacion = tiposEvaluaciones.find(tipo => tipo.nombreevaluación === "Evaluación cruzada");
                if (tipoAutoEvaluacion) {
                  const criteriosAutoEvaluacion = data.criterios.filter(
                    criterio => criterio.tipoevaluacion_idtipoevaluacion === tipoAutoEvaluacion.idtipoevaluacion
                  );
                  setCriterios(criteriosAutoEvaluacion);
                  setRespuestas(Array(criteriosAutoEvaluacion.length).fill(null)); 
                }
              }
          })
          .catch((error) => console.error("Error al cargar criterios:", error));
  } ;
  
  useEffect(() => {
    cargarCriterios();
}, [tiposEvaluaciones]);

  // Función para manejar la selección de radio buttons
  const handleRadioChange = (index, value) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = parseInt(value); // Convertir a número
    setRespuestas(nuevasRespuestas);
  };

  const enviarNotaFinal = async () => {
    // Calcular promedio y ajustar a escala de 100
    const total = respuestas.reduce((acc, val) => acc + (val || 0), 0);
    const promedio = total / criterios.length;
    const notaFinal = (promedio / 5) * 100; // Escala sobre 100

    const tipoAutoEvaluacion = tiposEvaluaciones.find(tipo => tipo.nombreevaluación === "Evaluación cruzada");

    try {
      const response = await fetch("https://tis-e8f3f498eaee.herokuapp.com/guardarNotaFinal.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idevaluador: user.idGrupoEmpresa,
          notaPromedio: notaFinal,
          tipoevaluacion_idtipoevaluacion: tipoAutoEvaluacion?.idtipoevaluacion,
          grupoempresa_idgrupoempresa: user.idGrupoEmpresa
        })
      });

      const result = await response.json();
      if (result.success) {
        setModal({
          show: true,
          title: "Nota guardada",
          message: "La nota final se ha guardado exitosamente."
        });
      } else {
        setModal({
          show: true,
          title: "Nota no guardada",
          message: result.message
        });
        throw new Error(result.message);
  
      }
    } catch (error) {
      console.error("Error al enviar la nota final:", error);
    }
  };


  const closeModal = () => {
    setModal({
      ...modal,
      show: false
    });
  };

  const allAnswered = respuestas.every((respuesta) => respuesta !== null);

  return (
    <>
      <NavbarInicioDeSesion />
      <div style={{ display: 'flex', height: 'calc(-110px + 100vh)', marginTop: '70px' }}>
        <BarraLateral />
        <div className='evaluacion'>
          <div className='final'>
            <div>
              <h2 className='tit'>Evaluación final</h2>
            </div>
            <div>
              <h2 className='descripcion'>
                Su empresa fué designada para evaluar el producto de la empresa " " como evaluación final (EVALUACIÓN CRUZADA) bajo la siguiente planilla.
              </h2>
              <h2 className='descripcion'>
                La planilla muestra el enlace del producto finalizado, un cuadro con los promedios de cada sprint calificados por el docente y enlaces a los diferente informes finales de cada sprint entregados por el equipo a evaluar. Éstos deben ser usados como guia para calificar los diferentes criterios de la evaluación; se usara una escala de calidad de trabajo con las siguientes casillas:
              </h2>
              <h2 className='casillas'>
                1: Muy pobre | 2: Pobre | 3: Adecuado | 4: Bueno | 5: Excelente
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
                    <td>{criterio.criterio}</td>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <td key={value}>
                        <input
                          type="radio"
                          className='checkradio'
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
            <div className='boton'>
              <button className="submit-button" 
              onClick={enviarNotaFinal}
              disabled={!allAnswered}
              >
                Guardar Nota Final
              </button>
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
  );
}
