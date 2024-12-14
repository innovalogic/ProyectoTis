import React, { useState } from 'react';
import { useUser } from "../Componentes/UserContext"; // Asegúrate de que la ruta sea correcta
import Navbar from "../Componentes/NavbarInicio"; // Verifica el nombre del archivo
import BarraLateral from "../Componentes/BarraLateralDocente"; // Asegúrate de que la ruta y nombre sean correctos
import BarraCopyright from "../Componentes/BarraCopyright";

const PerfilDocente = () => {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState('');
  

  const handleSubirImagen= async (data) => {
    console.log(user.idDocente)
    const newData = { ...data ,idDocente:user.idDocente};
     // Agrega el console.log aquí
     console.log("Datos enviados:", JSON.stringify(newData));
    try {
      const response = await fetch('http://localhost/proyectotis/backend/subirFotoPerfil.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
      });

      if (!response.ok) {
          throw new Error("Error en la respuesta del servidor.");
      }

      // Procesar la respuesta del servidor
      const result = await response.json(); // Suponiendo que el servidor retorna un JSON
      console.log('Resultado de la subida:', result);

      if (result.success) {
          console.log("Imagen de perfil actualizada correctamente."); // Mensaje de éxito
          alert("Imagen de perfil actualizada correctamente."); // Opcional: alerta para el usuario

      } else {
          console.error("Error al actualizar la imagen de perfil:", result.message); // Mensaje de error
          alert(result.message); // Mostrar mensaje de error al usuario
      }
  } catch (error) {
      console.error('Error al subir Imagen:', error);
      alert("Hubo un problema al registrar Imagen.");
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
        setImageUrl(uploadedImage.url); // Actualiza la URL de la imagen
        
  
        // Llamar a `handleSubirImagen` para enviar la URL al servidor
        const newData = { imageUrl: uploadedImage.url, idEstudiante: user.idEstudiante }; // Asegúrate de incluir idEstudiante aquí
        console.log('Datos que se enviarán:', newData); // Verifica los datos a enviar
        
        handleSubirImagen(newData);
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
};

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
                <div className="mb-4 text-2xl font-bold">NOMBRE: <span className="font-light ml-2">{user.nombreDocente}</span></div>
                <div className="mb-4 text-2xl font-bold">APELLIDO: <span className="font-light ml-2">{user.apellidoDocente}</span></div>
                <div className="mb-4 text-2xl font-bold">TELEFONO: <span className="font-light ml-2">{user.telefonoDocente}</span></div>
                <div className="mb-4 text-2xl font-bold">CORREO: <span className="font-light ml-2">{user.correoDocente}</span></div>
                <div className="mb-4 text-2xl font-bold">CODIGO DOCENTE: <span className="font-light ml-2">{user.CodigoDocente}</span></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-8 lg:mt-0 relative" style={{ left: '-70px' }}>
              <div className="mt-28">
                <img 
                  src={imageUrl || user.imageUrl}
                  alt="Foto de perfil" 
                  className="w-40 h-40 object-cover shadow-lg mb-4"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  id="upload-button"
                />
                <button 
                  onClick={() => document.getElementById('upload-button').click()}
                  className="bg-slate-500 text-white text-sm font-bold px-12 py-1 rounded-md hover:bg-blue-600 transition mt-1"
                >
                  CAMBIAR<br/> FOTO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BarraCopyright />
    </>
  );
}

export default PerfilDocente;
