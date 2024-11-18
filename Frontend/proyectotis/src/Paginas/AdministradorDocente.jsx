import BarraCopyright from "../Componentes/BarraCopyright";
import React, { useState,useEffect  } from "react";
import BarraLateral from "../Componentes/BarraLateralAdministrador";
import Navbar from "../Componentes/NavbarInicio";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function AdministradorDocente() {
  const location = useLocation();
  const navigate = useNavigate();
  const { nombreDocente, apellidoDocente, codigoDocente, telefonoDocente, contraseñaDocente, correoDocente,idDocente} = location.state?.data || {};
  const [perfil, setPerfil] = useState({
    nombre: nombreDocente,
    apellido: apellidoDocente,
    codigo:codigoDocente,
    telefono:telefonoDocente,
    contraseña:contraseñaDocente,
    email:correoDocente,
  });
  const [editMode, setEditMode] = useState(false); // Estado para alternar el modo de edición
  useEffect(() => {
    const storedPerfil = JSON.parse(localStorage.getItem('AdministradorDocente'));
    if (storedPerfil) {
      setPerfil(storedPerfil);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerfil({ ...perfil, [name]: value }); // Actualiza el estado al editar
  };

  const handleEdit = () => {
    setEditMode(true); // Activa el modo de edición
  };
  const handleSave = async () => {
    const updateDocente={
     idDocente:idDocente,
     nombreDocente: perfil.nombre,
     apellidoDocente: perfil.apellido,
     codigoDocente: parseInt(perfil.codigo),
     telefonoDocente: String(perfil.telefono),
     contrasenaDocente: String(perfil.contraseña),
     emailDocente: perfil.email,
 
 
    };  
    console.log("Datos enviados al backend:", updateDocente);
     try {
         const response = await fetch('http://localhost/ProyectoTis/Backend/actualizarPerfil.php', {
             method: 'POST',
             headers: { 
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(updateDocente), // Enviamos los datos de perfil como JSON
         });
 
         if (response.ok) {
             const result = await response.json();
             console.log("Datos guardados:", result);
             localStorage.setItem('AdministradorDocente', JSON.stringify(updateDocente));
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
      nombre: nombreDocente,
    apellido: apellidoDocente,
    codigo:codigoDocente,
    telefono:telefonoDocente,
    contraseña:contraseñaDocente,
    email:correoDocente
    });
    setEditMode(false);
  };
  const handleDelete = async () => {
    const confirmation = window.confirm("¿Estás seguro de que quieres eliminar este Docente?");
    if (confirmation) {
      try {
        const response = await fetch('http://localhost/ProyectoTis/Backend/eliminar.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idDocente:idDocente }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            alert("Docente eliminado con éxito");
            navigate("/BusquedaDocentes");
          } else {
            alert("Error al eliminar el Docente");
          }
        } else {
          console.error("Error al eliminar el Docente:", response.statusText);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud de eliminación:", error);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="bg-custom-bg flex" style={{ height: "100vh", marginTop: "70px" }}>
        <BarraLateral />
        <div className="flex justify-center items-center w-full mt-[-100px]">
          <div className="bg-[#1E3664] rounded-[75px] p-12 text-white w-[98%] md:w-[90%] lg:w-[80%] h-[70vh] shadow-2xl flex flex-col lg:flex-row justify-between relative">
            <h2 className="font-bold text-3xl absolute left-1/2 transform -translate-x-1/2 top-8">
              PERFIL DOCENTE
            </h2>
            <div className="flex flex-col items-center justify-center w-full lg:w-auto mt-16 lg:mt-0">
              <div className="flex flex-col ml-6 lg:ml-0">
              {Object.entries(perfil).map(([key2, value]) => (
                <div key={key2} className="mb-2 text-2xl font-bold">
                  {key2.toUpperCase()}:
                  {editMode ? (
                    <input
                      type="text"
                      name={key2}
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