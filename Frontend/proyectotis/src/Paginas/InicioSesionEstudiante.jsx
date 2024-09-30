import { useState } from "react";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from "../Componentes/BarraCopyright";
import UMSS from "/src/Imagenes/UMSS.jpg";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function InicioSesionEstudiante() {
  const [codSis, setCodSis] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y la página se recargue

    const formData = new FormData();
    formData.append('codSis', codSis);
    formData.append('password', Contraseña);

    try {
      const response = await fetch("http://localhost/ProyectoTis/Backend/inicioSesion.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      if (result.includes("Login successful")) {
        alert("Inicio de sesión exitoso!!");
      } else {
        alert("Error en el inicio de sesión :(");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="bg-cover bg-center h-screen flex flex-col justify-between" style={{ backgroundImage: `url(${UMSS})` }}>
      <NavbarInicioDeSesion />
      <div className="flex-grow flex items-center justify-center mt-16">
        <div
          className="bg-custom-bg bg-opacity-90 p-12 flex flex-col items-center justify-center"
          style={{ width: "60%", minWidth: "500px", height: "80%", maxWidth: "600px", borderRadius: "5rem", boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="text-center mt-0">
            <span className="text-5xl font-plex font-bold" style={{ color: "#1E3664" }}>
              Inicio Sesión Estudiante
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 mt-8 w-full max-w-sm">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>
                CodSis <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded-lg p-3"
                value={codSis}
                onChange={(e) => setCodSis(e.target.value)}
                placeholder="12345678"
                required
                maxLength={50}
                minLength={3}
              />
            </div>

            <div className="flex flex-col relative">
              <label className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>
                Contraseña <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"} // Alterna entre "password" y "text"
                className="border-2 border-gray-300 rounded-lg p-3"
                value={Contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="••••••••"
                required
                maxLength={50}
                minLength={3}
                
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
            </div>

            <div className="text-left">
              <span className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>
                ¿Es tu primera vez?{" "}
                <a href="RegistroEstudiante" className="text-red-600 font-semibold">
                  Regístrate
                </a>
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
