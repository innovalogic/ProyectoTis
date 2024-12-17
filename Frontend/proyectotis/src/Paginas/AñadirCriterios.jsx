import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';
import React, { useEffect, useState } from 'react';
import Modal from "../Componentes/Modal";
import './AreaEstudiante.scss';

export default function AñadirCriterios() {
    const [tiposEvaluaciones, setTiposEvaluaciones] = useState([]);
    const [criterios, setCriterios] = useState([]);
    const [selectedTipoEvaluacion, setSelectedTipoEvaluacion] = useState("");
    const [criterio, setCriterio] = useState("");
    const [modal, setModal] = useState({
        show: false,
        title: '',
        message: ''
      });

    useEffect(() => {
        fetch("http://innovalogic.tis.cs.umss.edu.bo/obtenerTipoEvaluacion.php")
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setTiposEvaluaciones(data.tiposEvaluaciones);
                }
            })
            .catch((error) => console.error("Error al cargar tipos de evaluación:", error));
    }, []);

    const cargarCriterios = () => {
        fetch("http://innovalogic.tis.cs.umss.edu.bo/obtenerCriterios.php")
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const criteriosConNombres = data.criterios.map((criterio) => {
                        const tipo = tiposEvaluaciones.find(
                            (tipo) => tipo.idtipoevaluacion === criterio.tipoevaluacion_idtipoevaluacion
                        );
                        return { ...criterio, nombreevaluación: tipo ? tipo.nombreevaluación : "Desconocido" };
                    });
                    setCriterios(criteriosConNombres);
                }
            })
            .catch((error) => console.error("Error al cargar criterios:", error));
    } ;

    useEffect(() => {
        cargarCriterios();
    }, [tiposEvaluaciones]);

    const handleGuardarCriterio = async (e) => {
        e.preventDefault();
        const nuevoCriterio = {
            criterio: criterio,
            tipoevaluacion_idtipoevaluacion: selectedTipoEvaluacion,
        };
        console.log('datos de criterio a ingresar:', nuevoCriterio)
        try {
            const response = await fetch('http://innovalogic.tis.cs.umss.edu.bo/guardarCriterio.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(nuevoCriterio) // Enviar idGrupoEmpresa
            });
            if (!response.ok) {
              const errorText = await response.text(); // Obtener el texto de error
              console.error('Error en la respuesta del servidor:', errorText);
              throw new Error("Error en la respuesta del servidor.");
            }
      
            const result = await response.json();
            if (result.success) {
                setCriterio(""); // Limpiar el campo de entrada
                cargarCriterios(); // Recargar la lista de criterios
                setModal({
                    show: true,
                    title: 'Éxito',
                    message: 'Criterio guardado con éxito'
                  });
                  return;
            } else {
                setModal({
                    show: true,
                    title: 'Error al guardar el criterio',
                    message: result.message
                  });
                return;
            }
          } catch (error) {
            console.error('Error en la solicitud:', error);    
          } 
    };

    // Eliminar un criterio
    const handleEliminarCriterio = async (id) => {
        try {
            const response = await fetch(`http://innovalogic.tis.cs.umss.edu.bo/eliminarCriterio.php?id=${id}`, {
                method: 'DELETE',
            });
    
            // Verificar si la respuesta del servidor es válida
            if (!response.ok) {
                const errorText = await response.text(); // Obtener el texto de error
                console.error('Error en la respuesta del servidor:', errorText);
                throw new Error("Error en la respuesta del servidor.");
            }
    
            const result = await response.json();
            console.log('Resultado:', result);
    
            // Evaluar el resultado de la respuesta
            if (result.success) {
                cargarCriterios(); // Recargar la lista de criterios
                setModal({
                    show: true,
                    title: 'Éxito',
                    message: 'Criterio eliminado con éxito',
                });
            } else {
                setModal({
                    show: true,
                    title: 'Error al eliminar el criterio',
                    message: result.message,
                });
            }
        } catch (error) {
            console.error('Error al eliminar el criterio:', error);
            setModal({
                show: true,
                title: 'Error',
                message: 'Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo.',
            });
        }
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
            <div className="flex w-screen mt-[70px] bg-[#32569A]" style={{ height: 'calc(-110px + 100vh)' }}>
                <BarraLateralDocente />
                <div className="PageAñadir" style={{  overflowY: 'auto'  }}>
                    <h1 className="titulocriterio">Registro de Criterios de Evaluación</h1>
                    {/* Formulario para ingresar criterio */}
                    <div >
                        <label className="subtitulo">Tipo de Evaluación:</label>
                        <select
                            value={selectedTipoEvaluacion}
                            onChange={(e) => setSelectedTipoEvaluacion(e.target.value)}
                            className="tipo"
                        >
                            <option value="">Seleccione un tipo</option>
                            {tiposEvaluaciones.map((tipo) => (
                                <option key={tipo.idtipoevaluacion} value={tipo.idtipoevaluacion}>
                                    {tipo.nombreevaluación}
                                </option>
                            ))}
                        </select>

                        <label className="subtitulo">Criterio:</label>
                        <input
                            type="text"
                            value={criterio}
                            onChange={(e) => setCriterio(e.target.value)}
                            className="criterio"
                        />

                        <button
                            onClick={handleGuardarCriterio}
                            className="guardarC"
                        >
                            Guardar Criterio
                        </button>
                    </div>

                    {/* Tabla de criterios guardados */}
                    <div className= "segundaparte">
                        <h2 className="subtitulo">Criterios Guardados</h2>
                        <table className="tabla-criterios">
                            <thead className="tabla-encabezado">
                                <tr>
                                    <th className="border p-2">Tipo de Evaluación</th>
                                    <th className="border p-2">Criterio</th>
                                    <th className="border p-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {criterios.map((item) => (
                                    <tr key={item.idcriterios}>
                                        <td className="border p-2">{item.nombreevaluación}</td>
                                        <td className="border p-2">{item.criterio}</td>
                                        <td className="border p-2">
                                            <button
                                                onClick={() => handleEliminarCriterio(item.idcriterios)}
                                                className="bg-red-500 text-white p-1"
                                            >
                                                Eliminar
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
            <Copyright />
        </>
    );
}
