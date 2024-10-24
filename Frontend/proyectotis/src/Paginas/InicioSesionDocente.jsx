import { useState } from "react";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from "../Componentes/BarraCopyright";
import UMSS2 from "/Imagenes/UMSS2.jpg";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../Componentes/UserContext";

export default function InicioSesionDocente() {
  const navigate = useNavigate();
  const [correoDocente, setCorreoDocente] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const { setUser } = useUser(); // Obtén la función setUser del contexto

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formData = new FormData();
    formData.append('correoDocente', correoDocente);  
    formData.append('password', Contraseña);

    try {
      const response = await fetch("https://tis-0c3180bcccbd.herokuapp.com/inicioSesionD.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json(); // Cambiado a json()
      
      if (result.message) {
        alert(result.message);
      } else {
        // Guarda los datos completos del docente en el contexto
        setUser(result); // Almacena todos los datos del docente en el contexto
        console.log(result); // Para verificar los datos del docente
        alert("Inicio de sesión exitoso!!");
        navigate("/InicioDocente");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-cover bg-center h-screen flex flex-col justify-between" style={{ backgroundImage: `url(${UMSS2})` }}>
      <NavbarInicioDeSesion />
      <div className="flex-grow flex items-center justify-center mt-16">
        <div
          className="bg-custom-bg bg-opacity-90 p-12 flex flex-col items-center justify-center"
          style={{ width: "60%", minWidth: "500px", height: "80%", maxWidth: "600px", borderRadius: "5rem", boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="text-center mt-0">
            <span className="text-5xl font-plex font-bold" style={{ color: "#1E3664" }}>
              Inicio Sesión
            </span>
            <br />
            <span className="text-5xl font-plex font-bold" style={{ color: "#1E3664" }}>
              Docente
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 mt-8 w-full max-w-sm">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>
                Correo <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded-lg p-3"
                value={correoDocente}
                onChange={(e) => setCorreoDocente(e.target.value)}
                placeholder="docente@gmail.com"
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>
                Contraseña <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"} 
                className="border-2 border-gray-300 rounded-lg p-3 pr-10" 
                value={Contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="••••••••"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform translate-y-2 cursor-pointer text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

            <button
              type="submit"
              className="bg-[#32569A] text-white rounded-lg text-lg font-semibold hover:bg-[#163a6c] transition duration-300 px-4 py-2"
              style={{ width: '9rem' }}
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
      <Copyright />
    </div>
  );
}
