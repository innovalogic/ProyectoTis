export const handleFileUpload = async (event) => {
  const files = event.target.files;
  if (!files || files.length === 0) {
      console.error("No se seleccionó ningún archivo.");
      return; // O lanza un error, dependiendo de cómo manejes esto
  }
  const file = files[0];
  const imagen = new FormData();
  imagen.append("file", file);
  imagen.append("upload_preset", "Imagenes_Grupos_Tis");
  imagen.append("cloud_name", "dtgcvktok");

  try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dtgcvktok/image/upload", {
          method: "POST",
          body: imagen
      });

      if (!res.ok) {
          throw new Error("Error en la respuesta de Cloudinary");
      }

      const uploadedImage = await res.json();

      console.log("Imagen subida:", uploadedImage.url);

      return uploadedImage.url; 
  } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error;
  }
};


