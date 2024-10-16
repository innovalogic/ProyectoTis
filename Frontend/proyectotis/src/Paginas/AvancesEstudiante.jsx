import React, { useState, useEffect } from "react";
import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralEstudiante";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import { useUser } from '../Componentes/UserContext'; 

export default function InicioEstudiante() {
  const { user } = useUser(); // Obtener los datos del estudiante logueado
  const [modalVisible, setModalVisible] = useState(false);
  const [Sprint, setSprint] = useState([]); // Estado para almacenar los sprints
  const [historiasDeUsuario, setHistoriasDeUsuario] = useState([]); // Estado para las HUs
  const [selectedSprint, setSelectedSprint] = useState(""); // Estado para el Sprint seleccionado
  const [tarea, setTareas] = useState([]);// Estado para almacenar los tareas
  const [selectedHu,setSelectedHu] = useState("");// Estado para el HU seleccionado
  const [selectedTarea, setSelectedTarea] = useState("");
  const [nombreArchivo, setNombreArchivo] = useState(""); // Estado para almacenar el nombre del archivo


  const idEstudiante = user ? user.idEstudiante : null;

  useEffect(() => {
    const fetchData = async () => {
      if (idEstudiante) { // Solo hacer la solicitud si el idEstudiante está definido
        try {
          const response = await fetch('http://localhost/ProyectoTis/Backend/Avances.php', {
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
        const response = await fetch('http://localhost/ProyectoTis/Backend/HuAvances.php', {
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
        const response = await fetch('http://localhost/ProyectoTis/Backend/TareaAvances.php', {
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
  
  

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

 // Función para manejar el envío del formulario
 const handleSubmit = async (event) => {
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
    const response = await fetch('http://localhost/ProyectoTis/Backend/subirArchivos.php', {
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
  } catch (error) {
    console.error('Error al subir el archivo o enlace:', error);
    alert('Ocurrió un error al intentar subir el archivo o enlace. Por favor, inténtalo de nuevo.');
  }
};


  

  return (
    <>
      <NavbarInicioDeSesion />
      <div className="flex h-full mt-16 bg-custom-bg">
        <BarraLateral />
        <div className="flex-grow p-8">
          <h1 className="text-4xl font-bold text-center mb-8" style={{ color: "#1E3664" }}>
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

          {/* Muro de noticias de avances */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#1E3664" }}>
              Noticias de Avances:
            </h2>
            <div className="w-full h-72 p-4 border border-gray-300 overflow-y-auto shadow-sm" style={{ height: "350px", backgroundColor: "#1E3664", borderRadius: "45px" }}>
              {/* Aquí puedes agregar el contenido de las noticias */}
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

      {/* Modal directamente implementado aquí */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-custom-bg p-8 rounded-lg shadow-lg w-96">
            {/* Botón de cerrar como una "X" en la parte superior derecha */}
            <button
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1E3664] text-white flex items-center justify-center hover:bg-blue-700 transition duration-200"
              onClick={handleCloseModal}
              aria-label="Cerrar"
            >
              X
            </button>
            
            {/* Título centrado */}
            <h2
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: "#1E3664" }}
            >
              SUBIR AVANCE
            </h2>

            {/* Nuevo Combobox para seleccionar Tarea */}
            <div className="mb-4">
              <label
                htmlFor="tarea-select"
                className="block mb-2 text-lg font-medium"
                style={{ color: "#1E3664" }}
              >
                Seleccionar Tarea:
              </label>
              <select
                id="tarea-select"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleTareaChange} > 
                <option value="">Seleccionar Tarea</option>
                {tarea.map((tareas, index) => (
                  <option key={index} value={tareas.titulo}>
                    {tareas.titulo}
                  </option>
                ))}
              </select>
            </div>

            {/* Formulario para subir archivos o enlaces */}
            <form onSubmit={handleSubmit}> {/* Añadido el evento onSubmit */}
              {/* Input para subir archivos */}
              <div className="mb-4">
                <label
                  htmlFor="file-upload"
                  className="block mb-2 text-lg font-medium"
                  style={{ color: "#1E3664" }}
                >
                  Subir archivo (PDF o DOC):
                </label>
                <input
    type="file"
    id="file-upload"
    accept=".pdf,.doc,.docx"
    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={(event) => {
      const file = event.target.files[0];
      if (file) {
        setNombreArchivo(file.name); // Actualiza el estado con el nombre del archivo
      } else {
        setNombreArchivo(""); // Resetea el nombre si no hay archivo
      }
    }}
  />
  {nombreArchivo && (
    <div className="mt-2 text-gray-700">
      <strong>Archivo seleccionado:</strong> {nombreArchivo}
    </div>
  )}
</div>

              {/* Input para subir enlace */}
              <div className="mb-4">
                <label
                  htmlFor="link-upload"
                  className="block mb-2 text-lg font-medium"
                  style={{ color: "#1E3664" }}
                >
                  Subir enlace:
                </label>
                <input
  type="text"
  id="link-upload"
  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Ingresa un enlace"
/>

              </div>

              {/* Botón para enviar */}
              <button
                type="submit"
                className="bg-[#1E3664] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200"
              >
                SUBIR
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
