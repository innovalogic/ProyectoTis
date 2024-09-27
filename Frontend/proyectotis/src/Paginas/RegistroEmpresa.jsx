import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateral';
import { useForm } from 'react-hook-form'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RegistroEmpresa() {

  const { register, handleSubmit } = useForm();
  const [preview, setPreview] = useState(null);

  const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reemplaza la URL con la ruta a tu archivo PHP
        axios.get('http://localhost/proyectoris/backend/RecuperarEstudiante.php')
            .then(response => {
                if (response.data.success) {
                    setData(response.data.data);
                } else {
                    setError(response.data.message);
                }
            })
            .catch(error => {
                setError('Error al obtener los datos');
            });
    }, []);

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await fetch('http://localhost/proyectotis/backend/registrarGrupo.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Usa los datos del formulario aquí
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor.");
      }

      const result = await response.json(); // Directamente parsear como JSON
      console.log("Resultado procesado:", result);
      
      if (result.success) {
        alert("Registro exitoso");
      } else {
        alert("Error en el registro: " + result.message);
      }
    } catch (error) {
      console.error('Error al registrar GrupoEmpresa:', error);
      alert("Hubo un problema al registrar GrupoEmpresa.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
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
                {...register("NombreEmpresa")}
                className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="nombreCorto" className="font-bold text-[#32569A]">
                Nombre Corto de la Empresa <span className="text-red-500">*</span>
              </label>
              <input
                id="nombreCorto"
                type="text"
                {...register("NombreCorto")}
                className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
              />
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
                {...register("CorreoEmpresa")}
                className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="representante" className="font-bold text-[#32569A]">
                Nombre Representante Legal <span className="text-red-500">*</span>
              </label>
              <input
                id="representante"
                type="text"
                {...register("NombreRepresentante")}
                className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
              />
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
                {...register("NumeroRepresentante")}
                className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="foto" className="font-bold text-[#32569A]">
                  Logo de la Empresa <span className="text-red-500">*</span>
                </label>
                
                {/* Input file oculto */}
                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  {...register("foto")}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex items-center mt-2">
                  {preview && (
                    <div className="flex items-center">
                      <img 
                        src={preview} 
                        alt="Vista previa" 
                        className="w-32 h-32 object-cover border border-[#32569A] rounded-md"
                      />
                      {/* Botón personalizado */}
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
                Estudiante
              </label>
              
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <input
                type="submit"
                value="Añadir"
                className="bg-[#32569A] text-white p-2 rounded-md cursor-pointer"
              />
              <input
                type="submit"
                value="Nuevo"
                className="bg-[#32569A] text-white p-2 rounded-md cursor-pointer"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-[#c2d2e9] border-collapse rounded-md shadow-md">
            <thead>
              <tr className="bg-[#c2d2e9] text-black">
                <th className="py-2 px-4 border border-[#32569A]">Número</th>
                <th className="py-2 px-4 border border-[#32569A]">Nombre</th>
                <th className="py-2 px-4 border border-[#32569A]">Telefono</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border border-[#32569A]">1</td>
                <td className="py-2 px-4 border border-[#32569A]">Juan Pérez</td>
                <td className="py-2 px-4 border border-[#32569A]">62353522</td>
              </tr>
              {/* Puedes agregar más filas aquí */}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end space-x-4">
          <input
                type="submit"
                value="Retirar"
                className="bg-[#32569A] text-white p-2 rounded-md cursor-pointer"
              />
              <input
          type="submit"
          value="Cancelar"
          className="bg-gray-300 text-black p-2 rounded-md cursor-pointer border-4 border-yellow-400"
        />
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