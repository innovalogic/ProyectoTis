import React, { useState, useEffect } from "react";
import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralAdministrador";
import Navbar from "../Componentes/NavbarInicio";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../Componentes/UserContext";

export default function AdministradorEstudiante() {
  const location = useLocation();
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    idEstudiante,
    nombreEstudiante,
    apellidoEstudiante,
    codSis,
    telefonoEstudiante,
    contraseñaEstudiante,
    idGrupoEmpresa,
    emailEstudiante,
  } = location.state?.data || {};

  // Estado para manejar el perfil y el modo de edición
  const [perfil, setPerfil] = useState({
    idEstudiante: idEstudiante,
    nombre: nombreEstudiante,
    apellido: apellidoEstudiante,
    codigoSis: codSis,
    telefono: telefonoEstudiante,
    contraseña: contraseñaEstudiante,
    grupo: idGrupoEmpresa,
    email: emailEstudiante,
  });
  

  const [editMode, setEditMode] = useState(false); // Estado para alternar el modo de edición
  useEffect(() => {
    // Verifica si location.state tiene datos válidos
    if (location.state?.data) {
      setPerfil({
        idEstudiante: idEstudiante,
        nombre: nombreEstudiante,
        apellido: apellidoEstudiante,
        codigoSis: codSis,
        telefono: telefonoEstudiante,
        contraseña: contraseñaEstudiante,
        grupo: idGrupoEmpresa,
        email: emailEstudiante,
      });
    } else {
      // Si no hay datos en location.state, carga desde localStorage
      const storedPerfil = JSON.parse(localStorage.getItem('AdministradorEstudiante'));
      if (storedPerfil) {
        setPerfil(storedPerfil);
      }
    }
  }, [location.state]);  // Se ejecuta cuando cambia location.state
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerfil({ ...perfil, [name]: value }); // Actualiza el estado al editar
  };

  const handleEdit = () => {
    setEditMode(true); // Activa el modo de edición
  };

  const handleSave = async () => {
    const updateEstudiante = {
      idEstudiante: perfil.idEstudiante,
      nombre: perfil.nombre,
      apellido: perfil.apellido,
      codigo: parseInt(perfil.codigoSis),
      telefono: String(perfil.telefono),
      contrasena: String(perfil.contraseña),
      grupo: parseInt(perfil.grupo),
      email: perfil.email,
    };
    console.log("Datos enviados al backend:", updateEstudiante);
    try {
      const response = await fetch('http://localhost/ProyectoTis/Backend/actualizarPerfil.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateEstudiante), // Enviamos los datos de perfil como JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Datos guardados:", result);
        localStorage.setItem('AdministradoEstudiante', JSON.stringify(updateEstudiante));
        setEditMode(false);
      } else {
        console.error("Error al guardar los datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleCancel = () => {
    // Restablece los valores originales y desactiva el modo de edición
    setPerfil({
      idEstudiante: idEstudiante,
      nombre: nombreEstudiante,
      apellido: apellidoEstudiante,
      codigo: codSis,
      telefono: telefonoEstudiante,
      contraseña: contraseñaEstudiante,
      grupo: idGrupoEmpresa,
      email: emailEstudiante,
    });
    setEditMode(false);
  };

  const handleDelete = async () => {
    const confirmation = window.confirm("¿Estás seguro de que quieres eliminar este estudiante?");
    if (confirmation) {
      try {
        const response = await fetch('http://localhost/ProyectoTis/Backend/eliminar.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idEstudiante: perfil.idEstudiante }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            alert("Estudiante eliminado con éxito");
            navigate("/BusquedaEstudiantes");
          } else {
            alert("Error al eliminar el estudiante");
          }
        } else {
          console.error("Error al eliminar el estudiante:", response.statusText);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud de eliminación:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-custom-bg flex" style={{ height: "calc(-110px + 100vh)", marginTop: "70px" }}>
        <BarraLateral />
        <div className="flex justify-center items-center w-full mt-[-100px]" style={{  overflowY: 'auto'  }}>
          <div className="bg-[#1E3664] rounded-[75px] p-12 text-white w-[98%] md:w-[90%] lg:w-[80%] h-[70vh] shadow-2xl flex flex-col lg:flex-row justify-between relative">
            <h2 className="font-bold text-3xl absolute left-1/2 transform -translate-x-1/2 top-8">
              PERFIL ESTUDIANTE
            </h2>
            <div className="flex flex-col items-center justify-center w-full lg:w-auto mt-16 lg:mt-0">
              <div className="flex flex-col ml-6 lg:ml-0">
              {Object.entries(perfil).map(([key, value]) => (
                <div key={key} className="mb-2 text-2xl font-bold">
                  {key.toUpperCase()}:
                  {editMode ? (
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="ml-2 p-1 text-black rounded w-64" // Puedes ajustar el tamaño aquí
                    />
                  ) : (
                    <span className="font-light ml-2">{value}</span>
                  )}
                </div>
              ))}

                <div className="flex justify-center mt-4">
                  {editMode ? (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleSave}
                      >
                        Guardar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCancel}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleEdit}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                        onClick={handleDelete}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BarraCopyright />
    </>
  );
}
