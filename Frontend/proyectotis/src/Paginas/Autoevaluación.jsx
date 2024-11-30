import React, { useState, useEffect } from 'react';
import { useUser } from '../Componentes/UserContext';
import './AreaEstudiante.scss';
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateralEstudiante';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Modal from '../Componentes/Modal';

export default function Autoevaluacion() {
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
    fetch("http://localhost/ProyectoTis/Backend/obtenerTipoEvaluacion.php")
      .then((response) => response.text())  // Cambiado a .text() para ver el contenido raw
      .then((data) => {
        console.log("Respuesta del servidor:", data);  // Ver qué está devolviendo el servidor
        try {
          const parsedData = JSON.parse(data);  // Intentamos parsear manualmente
          if (parsedData.success) {
            setTiposEvaluaciones(parsedData.tiposEvaluaciones);
          } else {
            console.error("Error:", parsedData.message);
          }
        } catch (e) {
          console.error("Error al parsear JSON:", e);
        }
      })
      .catch((error) => console.error("Error al cargar tipos de evaluación:", error));
  }, []);

  const cargarCriterios = () => {
      fetch("http://localhost/ProyectoTis/Backend/obtenerCriterios.php")
          .then((response) => response.json())
          .then((data) => {
              if (data.success) {
                const tipoAutoEvaluacion = tiposEvaluaciones.find(tipo => tipo.nombreevaluación === "Auto-evaluación");
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

    const tipoAutoEvaluacion = tiposEvaluaciones.find(tipo => tipo.nombreevaluación === "Auto-evaluación");

    try {
      const response = await fetch("http://localhost/ProyectoTis/Backend/guardarNotaFinal.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idevaluador: user.idEstudiante,
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

    if (modal.title === "Nota guardada") {
      navigate('/InicioEstudiante');
    }
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
                Para la evaluación final de la empresa el docente designo la AUTOEVALUACIÓN, por lo cual deberas evaluarte bajo los criterios de la siguiente planilla.
              </h2>
              <h2 className='descripcion'>
                La planilla usa una escala de frecuencia en la que debe guiarse con el trabajo que realizaste a lo largo del proyecto para calificar los diferentes criterios de la evaluación; se usaran las siguientes casillas:
              </h2>
              <h2 className='casillas'>
                1: Nunca | 2: Raramente | 3: A veces | 4: Frecuentemente | 5: Siempre
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
