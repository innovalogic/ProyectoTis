import React, { useState} from 'react';

const UploadImage = () => {

  const [preview, setPreview] = useState(null);

  const handleFileUpload = async(event) =>{
    const file = event.target.files[0]
    if(!file)return 
      const imagen = new FormData()
      imagen.append("file",file)
      imagen.append("upload_preset","Imagenes_Grupos_Tis")
      imagen.append("cloud_name","dtgcvktok")
      const res = await fetch("https://api.cloudinary.com/v1_1/dtgcvktok/image/upload",{
        method:"POST",
        body:imagen
      })
      const uploadedImageURL = await res.json()
      console.log(uploadedImageURL.url)
      setLoading(false)
  }

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
      <div className="flex flex-col w-full md:w-1/2">
          <label htmlFor="foto" className="font-bold text-[#32569A]">
              Logo de la Empresa <span className="text-red-500">*</span>
          </label>
              <input
                  id="foto"
                  type="file"
                  accept="image/*"
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
  );
};

export default UploadImage;
