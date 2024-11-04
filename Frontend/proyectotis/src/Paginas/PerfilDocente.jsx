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
      <Navbar /> {/* Componente de navegación */}
      <div className="bg-custom-bg flex" style={{ height: '100vh', marginTop: '70px' }}>
        <BarraLateral /> {/* Componente de la barra lateral */}
        <div className="flex justify-center items-center w-full mt-[-100px]">
          <div className="bg-[#1E3664] rounded-[75px] p-12 text-white w-[98%] md:w-[90%] lg:w-[80%] h-[70vh] shadow-2xl flex flex-col">
          <div className="flex flex-col mt-6 lg:mt-0">
            <h2 className="text-center font-bold text-3xl">PERFIL DOCENTE</h2>
            <div className="flex flex-col mt-6 ml-24 pt-8">
              <div className="mb-4 text-2xl font-bold">NOMBRE: <span className="font-light ml-2">{user.nombreDocente}</span></div>
              <div className="mb-4 text-2xl font-bold">APELLIDO: <span className="font-light ml-2">{user.apellidoDocente}</span></div>
              <div className="mb-4 text-2xl font-bold">TELEFONO: <span className="font-light ml-2">{user.telefonoDocente}</span></div>
              <div className="mb-4 text-2xl font-bold">CORREO: <span className="font-light ml-2">{user.correoDocente}</span></div>
              <div className="mb-4 text-2xl font-bold">CODIGO DOCENTE: <span className="font-light ml-2">{user.CodigoDocente}</span></div>
            </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6 lg:mt-0">
              <img 
                src={imageUrl || user.imageUrl} // Usa `imageUrl` o una imagen por defecto

                alt="Foto de perfil" 
                className="w-40 h-40 object-cover shadow-lg mb-4" // Cuadro de 40x40 (puedes ajustar el tamaño si prefieres)
              />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="hidden" // Oculta el input de archivo
                id="upload-button"
              />
              <button 
                onClick={() => document.getElementById('upload-button').click()} // Activa el input de archivo
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Subir Imagen
              </button>
            </div>
        </div>
      </div>
      <BarraCopyright />
    </>
  );    
}

export default PerfilDocente;