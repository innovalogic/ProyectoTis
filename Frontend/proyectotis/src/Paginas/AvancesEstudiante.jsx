import React, { useState, useEffect } from "react";
import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralEstudiante";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import { useUser } from '../Componentes/UserContext'; 
import ModalSubirAvance from '../Componentes/ModalSubirAvance';

export default function InicioEstudiante() {
  const { user } = useUser(); // Obtener los datos del estudiante logueado
  const [modalVisible, setModalVisible] = useState(false);
  const [Sprint, setSprint] = useState([]); // Estado para almacenar los sprints
  const [historiasDeUsuario, setHistoriasDeUsuario] = useState([]); // Estado para las HUs
  const [selectedSprint, setSelectedSprint] = useState(""); // Estado para el Sprint seleccionado
  const [tarea, setTareas] = useState([]);// Estado para almacenar los tareas
  const [selectedHu,setSelectedHu] = useState("");// Estado para el HU seleccionado
  const [selectedTarea, setSelectedTarea] = useState("");
  const [tabla, setTabla] = useState([]);

  


  const idEstudiante = user ? user.idEstudiante : null;
  const nombre = `${user.nombreEstudiante} ${user.apellidoEstudiante}`.trim();


  useEffect(() => {
    const fetchData = async () => {
      if (idEstudiante) { // Solo hacer la solicitud si el idEstudiante está definido
        try {
          const response = await fetch('http://innovalogic.tis.cs.umss.edu.bo/Avances.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idEstudiante }) // Enviar idEstudiante en el cuerpo de la solicitud
          });

          const text = await response.text(); // Obtener la respuesta como texto
          console.log(text); // Ver el texto que devuelve el servidor
          
          const data = JSON.parse(text); // Convertir el texto en un objeto JSON
          setSprint(data.Sprint || []); // Actualizar el estado solo si hay sprints, y asegurarse de que sea un array
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      }
    };
    
    fetchData();
  }, [idEstudiante]); // Ejecutar el efecto cuando idEstudiante cambie

  const handleSprintChange = async (event) => {
    const sprintSeleccionado = event.target.value;
    setSelectedSprint(sprintSeleccionado);
  
    if (sprintSeleccionado) {
      try {
        const response = await fetch('http://innovalogic.tis.cs.umss.edu.bo/HuAvances.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          // Combina ambos datos en un solo objeto
          body: JSON.stringify({
              sprintSeleccionado,
              idEstudiante
          })
      });

        const text = await response.text(); // Obtener la respuesta como texto
        console.log(text); // Ver el texto que devuelve el servidor
        
        const data = JSON.parse(text); // Convertir el texto en un objeto JSON
        setHistoriasDeUsuario(data.historiasDeUsuario || []); // Asegúrate de que 'historias' es la propiedad correcta
      } catch (error) {
        console.error('Error al obtener las HUs:', error);
      }
    } else {
      setHistoriasDeUsuario([]); // Resetear las HUs si no hay Sprint seleccionado
    }
  };
  const handleHuChange = async (event) => {
    const HuSeleccionado = event.target.value;
    setSelectedHu(HuSeleccionado);
    const sprintSeleccionado = selectedSprint; // Usa el sprint seleccionado previamente
    setSelectedSprint(sprintSeleccionado);
    console.log("HuSeleccionado:", HuSeleccionado);
    console.log("sprintSeleccionado:", sprintSeleccionado);
    console.log("idEstudiante:", idEstudiante);
  
    if (HuSeleccionado && sprintSeleccionado) {
      try {
        const response = await fetch('http://innovalogic.tis.cs.umss.edu.bo/TareaAvances.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            HuSeleccionado,
            sprintSeleccionado,
            idEstudiante
          })
        });
  
        const text = await response.text();
        console.log(text); // Aquí debes ver el texto completo de la respuesta
  
        const data = JSON.parse(text);
        setTareas(data.tarea || []); // Verifica que 'tarea' es la propiedad correcta
      } catch (error) {
        console.error('Error al obtener las Tareas:', error);
      }
    } else {
      setTareas([]); // Resetear las Tareas si no hay HU o Sprint seleccionado
    }
  };
  const handleTareaChange = async (event) => {
    const tareaSeleccionada = event.target.value;
    setSelectedTarea(tareaSeleccionada);
    const HuSeleccionado = selectedHu;
    setSelectedHu(HuSeleccionado);
    const sprintSeleccionado = selectedSprint; // Usa el sprint seleccionado previamente
    setSelectedSprint(sprintSeleccionado);
    console.log("tareaSeleccionada:", tareaSeleccionada);
    console.log("HuSeleccionado:", HuSeleccionado);
    console.log("sprintSeleccionado:", sprintSeleccionado);
    console.log("idEstudiante:", idEstudiante)
  };

    const fetchTablaAvances = async () => {
      if (idEstudiante) {
        try {
          const response = await fetch('http://innovalogic.tis.cs.umss.edu.bo/tablaAvances.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idEstudiante, nombre })
          });
   
          const text = await response.text();
          const data = JSON.parse(text);
          console.log(data); // Verifica qué datos recibes
          setTabla(data.tabla || []); // Usa data.tabla aquí
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      }
    };

    useEffect(() => {
      fetchTablaAvances();
    }, [idEstudiante]);




  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

 // Función para manejar el envío del formulario
 const handleSubmit = async (event, nombreArchivo) => {
  event.preventDefault(); // Evitar la recarga de la página

  const formData = new FormData();

  // Obtener el archivo del input 'file-upload'
  const fileInput = document.querySelector('#file-upload');
  let archivoSubido = false;
  
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;
    if (!allowedExtensions.exec(file.name)) {
      alert('Por favor selecciona un archivo válido (PDF o DOC)');
      return;
    }
    formData.append("archivo", file); // Agregar el archivo solo una vez
    archivoSubido = true; // Marcamos que se ha subido un archivo
  }
  // Adjunta el nombre del archivo si está disponible
  if (nombreArchivo) {
    formData.append("nombreArchivo", nombreArchivo);
  }


  // Obtener el enlace del input 'link-upload'
  const linkInput = document.querySelector('#link-upload').value;
  let enlaceProporcionado = false;
  
  if (linkInput.trim() !== "") {
    formData.append("enlace", linkInput); // Agregar el enlace al FormData
    enlaceProporcionado = true; // Marcamos que se ha proporcionado un enlace
  }

  // Verificar que al menos uno (archivo o enlace) esté presente
  if (!archivoSubido && !enlaceProporcionado) {
    alert('Por favor selecciona un archivo o proporciona un enlace.');
    return;
  }

  // Verificar que los otros datos están completos
  if (!selectedTarea || !selectedHu || !selectedSprint || !idEstudiante) {
    alert('Por favor completa todos los campos requeridos.');
    return;
  }

  formData.append("tareaSeleccionada", selectedTarea);
  formData.append("HuSeleccionado", selectedHu);
  formData.append("sprintSeleccionado", selectedSprint);
  formData.append("idEstudiante", idEstudiante);

  try {
    const response = await fetch('http://innovalogic.tis.cs.umss.edu.bo/subirArchivos.php', {
      method: 'POST',
      body: formData, // Enviar FormData
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor: ' + response.status);
    }

    const text = await response.text();
    console.log(text); // Ver la respuesta del servidor

    // Cerrar el modal si la carga fue exitosa
    setModalVisible(false);
    fetchTablaAvances();
  } catch (error) {
    console.error('Error al subir el archivo o enlace:', error);
    alert('Ocurrió un error al intentar subir el archivo o enlace. Por favor, inténtalo de nuevo.');
  }
};


  

  return (
    <>
      <NavbarInicioDeSesion />
      <div className="flex h-full mt-16 bg-custom-bg"  style={{ height: 'calc(-110px + 100vh)', marginTop: '70px'}}>
        <BarraLateral />
        <div className="flex-grow p-8">
          <h1 className="text-4xl font-bold text-center mb-8" style={{ color: "#1E3664"}}>
            AVANCES
          </h1>

          {/* Combobox de selección de Sprint */}
          <div className="flex justify-start gap-8 mb-8">
            <div>
              <label htmlFor="sprint-select" className="block mb-2 text-lg font-medium" style={{ color: "#1E3664" }}>
                Sprint:
              </label>
              <select id="sprint-select" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  onChange={handleSprintChange}>
                <option value="">Selecciona un Sprint</option>
                {Sprint.map((sprint, index) => (
                  <option key={index} value={sprint.nomSprint}>
                    {sprint.nomSprint}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tarea-select" className="block mb-2 text-lg font-medium" style={{ color: "#1E3664" }}>
                Historia de usuario:
              </label>
              <select id="tarea-select" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  onChange={handleHuChange}> 
              <option value="">Seleccionar HU</option>
                {historiasDeUsuario.map((hu, index) => (
                  <option key={index} value={hu.titulo0}> {/* Asegúrate de que 'idHU' es el identificador correcto */}
                    {hu.titulo} {/* Asegúrate de que 'nombreHU' es el nombre que deseas mostrar */}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8">
          <h2 className="font-semibold text-3xl"style={{ color: "#1E3664" }}>Tabla de Avances:</h2>
<div
    className="w-full h-72 p-4 border border-gray-300 overflow-y-auto shadow-sm"
    style={{ height: "350px", backgroundColor: "#1E3664", borderRadius: "45px" }}
>
    {/* Tabla de Avances */}
    <table className="w-full text-white">
        <thead>
            <tr>
                <th className="p-2 border-b">Sprint</th>
                <th className="p-2 border-b">Historia de Usuario</th>
                <th className="p-2 border-b">Tarea</th>
                <th className="p-2 border-b">Archivo</th>
                <th className="p-2 border-b">Link</th>
            </tr>
        </thead>
        <tbody>
            {tabla.length > 0 ? (
                tabla.map((sprint, index) => (
                    <tr key={index}>
                        <td className="p-2 border-b">{sprint.Sprint}</td> {/* Nombre del sprint */}
                        <td className="p-2 border-b">{sprint.HistoriaUsuario}</td> {/* Título de la historia de usuario */}
                        <td className="p-2 border-b">{sprint.Tarea}</td> {/* Título de la tarea */}
                        <td className="p-2 border-b">
    <a 
        href={`data:application/pdf;base64,${sprint.Archivo}`} 
        download={sprint.NombreArchivo || 'archivo.pdf'} 
        target="_blank" 
        rel="noopener noreferrer"
    >
        {sprint.NombreArchivo }
    </a>
</td>
                        <td className="p-2 border-b">
                            <a href={sprint.Link} target="_blank" rel="noopener noreferrer">
                                {sprint.Link} {/* Enlace al archivo o recurso */}
                            </a>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="p-2 border-b text-center">No hay datos disponibles</td>
                </tr>
            )}
        </tbody>
    </table>
</div>



            {/* Botón para subir avance */}
            <div className="mt-4 flex justify-end" style={{ marginRight: "15px" }}>
              <button className="text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 font-bold" style={{ backgroundColor: "#1E3664" }} onClick={handleOpenModal}>
                SUBIR AVANCE
              </button>
            </div>
          </div>
        </div>
      </div>

      <BarraCopyright />

      {/* Usar el componente Modal */}
      <ModalSubirAvance
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        tarea={tarea}
        handleTareaChange={handleTareaChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
