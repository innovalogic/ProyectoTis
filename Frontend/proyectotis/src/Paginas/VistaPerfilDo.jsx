import React, { useState, useEffect } from "react";
import { useUser } from "../Componentes/UserContext"; 
import Navbar from "../Componentes/NavbarInicio"; 
import BarraLateral from "../Componentes/BarraLateralEstudiante"; 
import BarraCopyright from "../Componentes/BarraCopyright";
import { useLocation } from "react-router-dom";

const VistaPerfilDo = () => {
  const { user } = useUser();
  const location = useLocation();
  const { idDocente } = location.state?.data || {}; // Asegurarse de que 'idDocente' esté presente
  const [docenteData, setDocenteData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (idDocente) { // Verifica que idDocente esté definido
        try {
          const response = await fetch('http://localhost/ProyectoTis/Backend/Docente.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idDocente }) // Pasando idDocente en el cuerpo de la solicitud
          });

          const data = await response.json(); // Se asume que el backend devuelve un JSON

          if (data.error) {
            console.error('Error:', data.error); // En caso de error, muestra el mensaje
          } else {
            setDocenteData(data.docenteData || {}); // Actualiza el estado con los datos obtenidos
          }
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      }
    };
    
    fetchData();
  }, [idDocente]);

  // Verifica si docenteData aún no está disponible y muestra un cargando
  if (!docenteData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-custom-bg flex" style={{ height: 'calc(-110px + 100vh)', marginTop: '70px' }}>
        <BarraLateral />
        <div className="flex justify-center items-center w-full mt-[-100px]">
          <div className="bg-[#1E3664] rounded-[75px] p-12 text-white w-[98%] md:w-[90%] lg:w-[80%] h-[70vh] shadow-2xl flex flex-col lg:flex-row justify-between relative">
            <h2 className="font-bold text-3xl absolute left-1/2 transform -translate-x-1/2 top-8">PERFIL DOCENTE</h2>
            <div className="flex flex-col items-center justify-center w-full lg:w-auto mt-16 lg:mt-0">
              <div className="flex flex-col ml-6 lg:ml-0">
                <div className="mb-4 text-2xl font-bold">NOMBRE: <span className="font-light ml-2">{docenteData.nombreDocente}</span></div>
                <div className="mb-4 text-2xl font-bold">APELLIDO: <span className="font-light ml-2">{docenteData.apellidoDocente}</span></div>
                <div className="mb-4 text-2xl font-bold">TELEFONO: <span className="font-light ml-2">{docenteData.telefonoDocente}</span></div>
                <div className="mb-4 text-2xl font-bold">CORREO: <span className="font-light ml-2">{docenteData.correoDocente}</span></div>
                <div className="mb-4 text-2xl font-bold">CODIGO DOCENTE: <span className="font-light ml-2">{docenteData.CodigoDocente}</span></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-8 lg:mt-0 relative" style={{ left: '-70px' }}>
              <div className="mt-28">
                <img 
                  src={docenteData.imageUrl || 'default-image-url.jpg'} // En caso de que no haya imagen, muestra una por defecto
                  alt="Foto de perfil" 
                  className="w-40 h-40 object-cover shadow-lg mb-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BarraCopyright />
    </>
  );
}

export default VistaPerfilDo;
