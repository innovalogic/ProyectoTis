import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateral';
import { useForm } from 'react-hook-form'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RegistroEmpresa() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageUrl, setImageUrl] = useState('');
    const [ultimoGrupo, setUltimoGrupo] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);
    const [estudiantesData, setEstudiantesData] = useState([]); 
    const [selectedEstudiantes, setSelectedEstudiantes] = useState([]);

    const handleSelectEstudiante = (e) => {
      const selectedId = e.target.value;
      const estudiante = estudiantesData.find(est => est.idEstudiante === Number(selectedId));
    
      const isEstudianteDuplicado = selectedEstudiantes.some(est => est.idEstudiante === estudiante.idEstudiante);
    
      // Verifica si el estudiante existe y no está duplicado
      if (estudiante && !isEstudianteDuplicado) {
        if (selectedEstudiantes.length < 5) {
          setSelectedEstudiantes((prev) => [...prev, estudiante]);
        } else {
          alert("No puedes seleccionar más de 5 estudiantes.");
        }
      } else if (isEstudianteDuplicado) {
        alert("Este estudiante ya está en la lista.");
      }
    };
    
    // Función para verificar si hay menos de 5 estudiantes seleccionados al finalizar
    const finalizarSeleccion = () => {
      if (selectedEstudiantes.length < 5) {
        alert("Debes seleccionar al menos 5 estudiantes.");
      } else {
        // Aquí va la lógica para proceder con los estudiantes seleccionados
        console.log("Selección finalizada con éxito", selectedEstudiantes);
      }
    };

    const handleRetirarEstudiante = (idEstudiante) => {
      setSelectedEstudiantes((prevEstudiantes) => 
        prevEstudiantes.filter(est => est.idEstudiante !== idEstudiante)
      );
    };

    const handleRegisterGroup = async (data) => {
      const newData = { ...data, imageUrl: imageUrl };
      try {
          const response = await fetch('http://localhost/proyectotis/backend/registrarGrupo.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newData),
          });
  
          if (!response.ok) {
              throw new Error("Error en la respuesta del servidor.");
          }
  
          const result = await response.json(); 
          if (result.success) {
              console.log("ID del último registro:", result.lastUserId);
              return result.lastUserId; // Devuelve el ID del grupo
          } else {
              alert("Error en el registro: " + result.message);
          }
      } catch (error) {
          console.error('Error al registrar GrupoEmpresa:', error);
          alert("Hubo un problema al registrar GrupoEmpresa.");
      }
  };


      const asignarGrupoEstudiantes = async (ultimoGrupo) => {
          const idsEstudiantes = selectedEstudiantes.map(estudiante => estudiante.idEstudiante);
          
          const dataToSend = {
              estudiantes: idsEstudiantes,
              idGrupo: ultimoGrupo
          };
          console.log(idsEstudiantes, ultimoGrupo)
          try {
              const response = await fetch('http://localhost/proyectotis/backend/actualizarGrupoEstudiantes.php', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(dataToSend),
              });
  
              if (!response.ok) {
                  throw new Error("Error en la respuesta del servidor.");
              }
  
              const result = await response.json(); 
              console.log("Resultado procesado:", result);
              
              if (result.success) {
                  console.log("Grupo asignado a los estudiantes");
              } else {
                  alert("Error: " + result.message);
              }
          } catch (error) {
              console.error('Error al actualizar estudiantes:', error);
              alert("Hubo un problema al actualizar los estudiantes.");
          }
      };


    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      const imagen = new FormData();
      imagen.append("file", file);
      imagen.append("upload_preset", "Imagenes_Grupos_Tis");
      imagen.append("cloud_name", "dtgcvktok");
      try {
          const res = await fetch("https://api.cloudinary.com/v1_1/dtgcvktok/image/upload", {
              method: "POST",
              body: imagen
          });
    
          const uploadedImage = await res.json();
          console.log("Imagen subida:", uploadedImage.url);
          setImageUrl(uploadedImage.url);
      } catch (error) {
          console.error("Error al subir la imagen:", error);
          throw error;
      }
    };

    useEffect(() => {
      const fetchEstudiantes = async () => {
          try {
              const response = await axios.get('http://localhost/proyectotis/backend/RecuperarEstudiante.php');
              console.log(response.data.success); // Ver toda la respuesta
              if (response.data.success === true) {
                  setEstudiantesData(response.data.datos); // Asegúrate de que esto sea un array
                  console.log(response.data.datos); // Verificar los datos
              } else {
                  setError('No se pudo obtener los datos.');
              }
          } catch (error) {
              setError('Error al conectarse al servidor: ' + error.message);
              console.error(error);
          }
      };
  
      fetchEstudiantes();
  }, []);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
        if (file) {
          const objectUrl = URL.createObjectURL(file);
          setPreview(objectUrl); 
        } else {
          setPreview(null);
        }
   };
 
    const handleFileSelect = (event) => {
      handleFileChange(event); 
      handleFileUpload(event); 
    };



    const onSubmit = async (data) => {
      // Validar si se han seleccionado al menos 5 estudiantes
      if (selectedEstudiantes.length < 5) {
        alert("Debes seleccionar al menos 5 estudiantes antes de proceder.");
        return; // Detener el flujo si no se cumplen los requisitos
      }
    
      try {
        // Llamar a la función para registrar el grupo y obtener el ID del grupo
        const ultimoGrupo = await handleRegisterGroup(data);
        
        if (ultimoGrupo) {
          // Si se registró el grupo correctamente, asignar los estudiantes al grupo
          asignarGrupoEstudiantes(ultimoGrupo); // Pasa el ID del grupo a la función
          console.log("Estudiantes asignados correctamente al grupo.");
        } else {
          console.error("No se pudo obtener el ID del grupo.");
        }
      } catch (error) {
        console.error("Error durante el registro del grupo:", error);
      }
    };

  return (
    <>
        <NavbarInicioDeSesion />
        <div style={{ display: 'flex', height: '100%', marginTop: '70px', backgroundColor: '#32569A' }}>
          <BarraLateral/>

        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 p-4 flex-1 bg-[#c2d2e9] rounded-md` }>
          <h1 className="text-2xl font-bold text-[#32569A] text-center mb-4">Registro de Empresa</h1>

          <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="nombre" className="font-bold text-[#32569A]">
                  Nombre de Empresa <span className="text-red-500">*</span>
                </label>
                <input
                  id="nombre"
                  type="text"
                  {...register("NombreEmpresa", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9\s]*$/,
                      message: "No se permiten caracteres especiales",
                    },
                  })}
                  className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
                />
                {errors.NombreEmpresa && <p className="text-red-500">{errors.NombreEmpresa.message}</p>}
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="nombreCorto" className="font-bold text-[#32569A]">
                  Nombre Corto de la Empresa <span className="text-red-500">*</span>
                </label>
                <input
                  id="nombreCorto"
                  type="text"
                  {...register("NombreCorto", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9\s]*$/,
                      message: "No se permiten caracteres especiales",
                    },
                  })}
                  className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
                />
                 {errors.NombreCorto && <p className="text-red-500">{errors.NombreCorto.message}</p>}
              </div>
           </div>

           <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="correo" className="font-bold text-[#32569A]">
                  Correo electrónico de la empresa <span className="text-red-500">*</span>
                </label>
                <input
                  id="correo"
                  type="email"
                  {...register("CorreoEmpresa", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Formato de correo electrónico inválido",
                    },
                  })}
                  className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
                />
                {errors.CorreoEmpresa && <p className="text-red-500">{errors.CorreoEmpresa.message}</p>}
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="representante" className="font-bold text-[#32569A]">
                  Nombre Representante Legal <span className="text-red-500">*</span>
                </label>
                <input
                  id="representante"
                  type="text"
                  {...register("NombreRepresentante", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9\s]*$/,
                      message: "No se permiten caracteres especiales",
                    },
                  })}
                  className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
                />
                {errors.NombreRepresentante && <p className="text-red-500">{errors.NombreRepresentante.message}</p>}
              </div>  
            </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="numeroRepresentante" className="font-bold text-[#32569A]">
                Número Representante Legal <span className="text-red-500">*</span>
              </label>
              <input
                id="numeroRepresentante"
                type="text"
                {...register("NumeroRepresentante", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^\d{8}$/, // Acepta solo números de 8 dígitos
                    message: "Debe ser un número de 8 dígitos",
                  },
                })}
                className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
              />
              {errors.NumeroRepresentante && (
                <p className="text-red-500">{errors.NumeroRepresentante.message}</p>
              )}
            </div>
            <div className="flex flex-col w-full md:w-1/2">
                  <label htmlFor="foto" className="font-bold text-[#32569A]">
                    Logo de la Empresa <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="foto"
                    type="file"
                    accept="image/*"
                    className ="hidden"
                    onChange={handleFileSelect}
                  />

                  <div className="flex items-center mt-2">
                    {preview && (
                      <div className="flex items-center">
                        <img 
                          src={preview} 
                          alt="Vista previa" 
                          className="w-32 h-32 object-cover border border-[#32569A] rounded-md"
                        />
                        <label
                          htmlFor="foto"
                          className="cursor-pointer bg-[#32569A] text-white p-1 rounded-md text-center ml-4 w-32"
                        >
                          Seleccionar archivo
                        </label>
                      </div>
                    )}
                    {!preview && (
                      <label
                        htmlFor="foto"
                        className="cursor-pointer bg-[#32569A] text-white p-1 rounded-md text-center mt-2"
                      >
                        Seleccionar archivo
                      </label>
                    )}
                  </div>
                </div>

            </div>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="estudiante" className="font-bold text-[#32569A]">
                Estudiantes del Grupo (Minimo 5)<span className="text-red-500">*</span>
              </label>
              <select
                  id="estudiante"
                  className="mt-2 p-2 border border-gray-300 rounded"
                  onChange={handleSelectEstudiante}
                >
                  <option value="" disabled selected>
                    Selecciona un estudiante
                  </option>
                  {estudiantesData.map((estudiante) => (
                    <option key={estudiante.idEstudiante} value={estudiante.idEstudiante}>
                      {`${estudiante.nombreEstudiante} ${estudiante.apellidoEstudiante}`}
                    </option>
                  ))}
                </select>
          </div>
            <div className="flex space-x-4 mt-4 md:mt-0">

            </div>
          </div>
          
          <div className="overflow-x-auto p-4">
            
          <table className="min-w-full bg-[#c2d2e9] border-collapse rounded-md ">
              <thead>
                <tr className="bg-[#c2d2e9] text-black">
                  <th className="py-2 px-4 border border-solid  border-[#32569A]">Número</th>
                  <th className="py-2 px-4 border border-solid  border-[#32569A]">Nombre</th>
                  <th className="py-2 px-4 border border-solid  border-[#32569A]">Teléfono</th>
                  <th className="py-2 px-4 border border-solid  border-[#32569A]">Acción</th> 
                </tr>
              </thead>
              <tbody>
                {selectedEstudiantes.map((estudiante, index) => (
                  <tr key={estudiante.idEstudiante}>
                    <td className="py-2 px-4 border border-solid   border-[#32569A]">{index + 1}</td>
                    <td className="py-2 px-4 border border-solid  border-[#32569A]">
                      {`${estudiante.nombreEstudiante} ${estudiante.apellidoEstudiante}`}
                    </td>
                    <td className="py-2 px-4 border border-solid r border-[#32569A]">{estudiante.telefonoEstudiante}</td>
                    <td className="py-2 px-4 border border-solid  border-[#32569A]">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleRetirarEstudiante(estudiante.idEstudiante)}
                      >
                        Retirar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-300 text-black p-2 rounded-md cursor-pointer border-4 border-yellow-400"
                onClick={handleFileUpload}
              >
                Cancelar
              </button>

              <input
                type="submit"
                value="Registrar"
                className="bg-[#32569A] text-white p-2 rounded-md cursor-pointer"
              />
      
          </div>
          </div>
          <div>
            {error && <p>Error: {error}</p>}
            <ul>
                {data.map(estudiante => (
                    <li key={estudiante.idEstudiante}>
                        {estudiante.nombreEstudiante} {estudiante.apellidoEstudiante}
                    </li>
                ))}
            </ul>
        </div>  
          </form>
        </div>
      <Copyright/>
    </>
    
  );
}